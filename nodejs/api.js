import constants from './constants.js'
import Redis from 'ioredis'
import axios from 'axios'

const redis = new Redis(constants.redis)

const keyCheck = () =>  {
  if (!process.env.WEATHER_API_KEY) {
    console.error(`No Weather API key detected as an ENVIRONMENT VARIABLE.
    Head to https://openweathermap.org/appid to get a free API key.
    Then store the key in an environment variable from the command line:
    $ export WEATHER_API_KEY=<your api key>`)
    quit()
  }
}

const cityEndpoint = (city) => `${constants.endpoint(city)}${constants.key}`

const quit = () => {
  redis.quit()
  process.exit()
}

/* Returns a JSON object of the current weather conditions for a given city */
const getWeather = (city) => {
  /* Check if WEATHER_API_KEY exists in Environment Variables */
  keyCheck()

  /* Check Redis for cached entry first */
  return redis.get(`weather:${city}`)
    .then( entry => {
      /* If Redis returns a cache hit, */
      if (entry) {
        entry = JSON.parse(entry)

        /* return the entry */
        return {...entry, 'source': 'cache'}
      }

      /* If Redis returns a cache miss, fetch and return data from the API */
      return axios.get(cityEndpoint(city))
        .then(response => {

          /* Add the entry to Redis for next time and set an expiry of one hour so weather data is timely */
          redis.set(`weather:${city}`, JSON.stringify(response.data), 'EX', 3600)

          /* Return the database entry */
          return {...response.data, 'source': 'API'}
        })
    })
}

const city = 'Oakland'
const t0 = new Date().getTime()
getWeather(city).then(weather => {
  const t1 = new Date().getTime()
  weather.responseTime = `${t1-t0}ms`
  console.log(weather)
  quit()
})
