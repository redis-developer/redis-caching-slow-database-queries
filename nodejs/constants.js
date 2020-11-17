export default {
    'key' : process.env.WEATHER_API_KEY,
    'endpoint': (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=`,
    'redis' : {
        'port': process.env.REDIS_PORT || 6379,
        'host': process.env.REDIS_HOST || '127.0.0.1'
    },
    'server_port': process.env.SERVER_PORT || 3000,
    'sqlite_database': process.env.SQLITE_DB || './db/weather.db',
    'weather_csv': process.env.WEATHER_CSV || './db/weather.csv'
}