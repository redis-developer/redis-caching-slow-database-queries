module.exports = {
    'key' : process.env.weather_api_key, // TODO: remove before deploy 
    'endpoint': (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=`,
    'redis' : {
        'port': process.env.redis_port || 6379,
        'host': process.env.redis_host || '127.0.0.1'
    },
    'server_port': process.env.server_port || 3000,
    'sqlite_database': process.env.sqlite_db || './db/weather.db',
    'weather_csv': process.env.weather_csv || './db/weather.csv'
}