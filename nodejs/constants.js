import sqlite3 from 'sqlite3'

export default {
    'redis' : `redis://localhost:6379`,
    'sqlite_database': process.env.SQLITE_DB || {
        filename: 'db/weather.db',
        driver: sqlite3.Database
    },
    'weather_csv': process.env.WEATHER_CSV || './db/weather.csv'
}
