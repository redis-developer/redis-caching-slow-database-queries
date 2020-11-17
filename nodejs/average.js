import constants from './constants.js'
import { Database } from 'sqlite'
import Redis from 'ioredis'

const db = new Database(constants.sqlite_database)
const redis = new Redis(constants.redis)
const TMAX_average_sql = `SELECT AVG(TMAX) FROM weather`

/* Returns average of maximum recorded daily temperatures from database. */
const getAverage = async () => {

  /* Check Redis for cached entry first */
  return await redis.get('weather:average')
    .then(entry => JSON.parse(entry))
    .then( async entry => {

    /* If Redis returns a cache hit, */
    if(entry) {
      /* return the entry */
      return {...entry, 'source' : 'cache'}
    }

    /* If Redis returns a chache miss, fetch the entry from the database */
    await db.open()
    return await db.get(TMAX_average_sql, [])
      .then(db_entry => {
      
      /* Add the entry we pulled from the database to the cache */
      redis.set('weather:average', JSON.stringify(db_entry))

      /* Return the database entry */
      return {...db_entry, 'source' : 'database'}
    })
   })
}

const t0 = new Date().getTime()
getAverage().then( average => {
  const t1 = new Date().getTime()
  average.responseTime = `${t1-t0}ms`
  console.log(average)
  redis.quit()
  process.exit()
})
