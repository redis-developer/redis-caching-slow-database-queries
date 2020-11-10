module.exports = {
    'w_api' : '222eba49a41bd7add165f53a342ef0b2',
    'redis' : {
        'port': process.env.redis_port || 6379,
        'host': process.env.redis_host || '127.0.0.1'
    },
    'server_port': process.env.server_port || 3000,
    'sqlite_database': process.env.sqlite_db || './db/sample.db'
}