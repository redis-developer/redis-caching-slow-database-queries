const constants = require('./constants.js')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(constants.sqlite_database)
const Redis = require('ioredis')
const redis = new Redis(constants.redis)

const TMAX_average_sql = `SELECT AVG(TMAX) FROM weather`

const returnEntry =  (entry, source, responseTime = false) => {
  console.log(`Sending from ${source}: ${entry}`)
  responseTime && console.log(`Response time: ${responseTime} ms`)
}

/* Returns average of maximum recorded daily temperatures from database. */
const getAverage = () => {

  /* Check Redis for cached entry first */
  redis.get('weather:average', (err, entry) => {    

    /* If Redis returns a cache hit, */
    if(entry) {

      /* return the entry */
      returnEntry(entry, 'cache')

      return
    }
    /* If Redis returns a chache miss */
    if(!entry) {

      /* Fetch the entry from the database */
      db.get(TMAX_average_sql, (err, db_entry) => {

        /* Return the database entry */
        returnEntry(JSON.stringify(db_entry), 'database')

        /* Add the entry to Redis for next time */
        redis.set('weather:average', JSON.stringify(db_entry))
         
        return
      })
    }
  })
}

/* Returns average of maximum recorded daily temperatures from database, with timing. */
const getAverage_T = () => {
  let startTime = new Date().getTime()
  redis.get('weather:average', (err, entry) => {
    let endTime = new Date().getTime()
    let responseTime = (endTime - startTime)

    if(entry) {
      return returnEntry(entry, 'cache', responseTime)
    }

    if(!entry) {
        startTime = new Date().getTime()
        db.get(TMAX_average_sql, (err, db_entry) => {
          endTime = new Date().getTime()
          responseTime = (endTime - startTime)

          returnEntry(JSON.stringify(db_entry), 'database', responseTime)
          redis.set('weather:average', JSON.stringify(db_entry), 'EX', 60*60*12)
          
          return
        })
    }
  })
}

( () => {
  process.argv[2] == 'timed'
  ? getAverage_T()
  : getAverage()
})()
