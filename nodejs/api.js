const constants = require('./constants.js')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(constants.sqlite_database)
const Redis = require('ioredis')
const redis = new Redis(constants.redis)
const axios = require('axios')

const returnEntry = (entry, source, responseTime = false) => {
  console.log(`Sending from ${source}: `, entry);
  responseTime && console.log(`Response time: ${responseTime} ms`)
  process.exit()
}

/* Returns a JSON object of the current weather conditions for a given city */
const getWeather = (city) => {

  /* Check Redis for cached entry first */
  redis.get(`weather:${city}`, (err, entry) => {

    /* If Redis returns a cache hit, */
    if (entry) {

      /* return the entry */
      returnEntry(JSON.parse(entry), 'cache')


    }
    /* If Redis returns a chache miss */
    if(!entry) {

      /* Fetch the data from the API */
      api_endpoint = `${constants.endpoint(city)}${constants.key}`
      axios.get(api_endpoint)
        .then(res => {

          /* Return the database entry */
          returnEntry(res.data, 'API')

          /* Add the entry to Redis for next time */
          redis.set(`weather:${city}`, 
          JSON.stringify(res.data), 
          /* Set an expiry of one hour so weather data is timely */
          'EX', 3600)
        })
    }
  })
}

/* Returns a JSON object of the current weather conditions for a given city, with timing */
const getWeather_T = (city) => {
  let startTime = new Date().getTime()
  redis.get(`weather:${city}`, (err, entry) => {
    let endTime = new Date().getTime()
    let responseTime = (endTime - startTime)
    if (entry) {
      returnEntry(JSON.parse(entry), 'cache', responseTime)
      return
    }
    if(!entry) {
      api_endpoint = `${constants.endpoint(city)}${constants.key}`
      startTime = new Date().getTime()
      axios.get(api_endpoint)
        .then(res => {
          endTime = new Date().getTime()
          responseTime = (endTime - startTime)
          returnEntry(res.data, 'API', responseTime)
          redis.set(`weather:${city}`, 
          JSON.stringify(res.data), 
          'EX', 3600)
          return
        })
    }
  })
}

( () => {
  getWeather_T('Oakland')
})()
