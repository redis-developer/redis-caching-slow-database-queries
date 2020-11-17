const constants = require('./constants.js')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(constants.sqlite_database)
const Redis = require('ioredis')
const redis = new Redis(constants.redis)
const axios = require('axios')

const cityEndpoint = (city) => api_endpoint = `${constants.endpoint(city)}${constants.key}`

const keyCheck = () =>  {
  if (!process.env.WEATHER_API_KEY) {
    console.error(`No Weather API key detected as an ENVIRONMENT VARIABLE.
    Head to https://openweathermap.org/appid to get a free API key.
    Then set an environment variable in your command line:
    $ export WEATHER_API_KEY=<your new api key>`)
    quit()
  }
}

const quit = () => {
  redis.quit()
  process.exit()
}

/* Returns a JSON object of the current weather conditions for a given city */
const getWeather = async (city) => {
  keyCheck()

  /* Check Redis for cached entry first */
  return await redis.get(`weather:${city}`)
    .then( async entry => {
      /* If Redis returns a cache hit, */
      if (entry) {
        cached_entry = JSON.parse(entry)
        cached_entry.source = 'cache'
        /* return the entry */
        return cached_entry
      }

      /* If Redis returns a cache miss, fetch and return data from the API */
      return await axios.get(cityEndpoint(city))
        .then(response => {

          /* Add the entry to Redis for next time */
          redis.set(`weather:${city}`, 
          JSON.stringify(response.data),
          /* Set an expiry of one hour so weather data is timely */
          'EX', 3600)
          response.data.source = 'API'
          return response.data
        })
    })
}

const city = 'Oakland'
let t0 = new Date().getTime()
getWeather(city).then(weather => {
  let t1 = new Date().getTime()
  weather.responseTime = `${t1-t0}ms`
  console.log(weather)
  quit()
})
