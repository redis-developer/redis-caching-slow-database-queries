import sqlite3 from 'sqlite3'

export default {
    'redis' : {
        'port': process.env.REDIS_PORT || 6379,
        'host': process.env.REDIS_HOST || '127.0.0.1'
    },
    'sqlite_database': process.env.SQLITE_DB || {
        filename: 'db/weather.db',
        driver: sqlite3.Database
    },
    'weather_csv': process.env.WEATHER_CSV || './db/weather.csv'
}
