# Caching

Simple caching examples with Redis and Node.js!

## Prerequisites

- Node.js
- SQLite
- SQLite3
- Redis
- Docker

## Installing this application

Clone the repository to your computer:

```bash
$ git clone https://github.com/redis-developer/redis-caching-slow-database-queries.git
```

Navigate to the NodeJS folder:

```bash
$ cd nodejs
```

Install dependencies:

```bash
$ npm install 
```

## Database Preparation

Ensure you have Redis installed and running.

You can run it with Docker:

```bash
$ docker-compose up -d
```

You can also run redis-cli in the container
```bash
$  docker exec -it redis-caching-slow-database-queries redis-cli
```
> NOTE: If you're using Redis Enterprise Cloud, you'll need the hostname, port number, and password for your database.  Use these to set the `REDIS_OM_URL` environment variable like this:

```bash
$ export REDIS_OM_URL=redis://default:<password>@<host>:<port>
```

(**This step is not required when working with Docker as the Docker container** runs Redis on `localhost` port `6379` with no password, which is the default connection that Redis OM uses.)

For example if your Redis Enterprise Cloud database is at port `9139` on host `enterprise.redis.com` and your password is `5uper53cret` then you'd set `REDIS_OM_URL` as follows:

> You can also use redis-stack on your browser

> Ensure you have SQLite3 installed.

### Unzip and import data to the SQLite `weather` table:

Unzip the weather.csv.zip file that is in the `db` folder:

```bash
$ gzip -d db/weather.csv.zip
```

Run the Sqlite3 command line interface to import the `weather.csv` file and set empty `TAVG` values to `NULL`:

```bash
$ sqlite3
sqlite> .open db/weather.db
sqlite> .mode csv
sqlite> .import db/weather.csv weather_measurements
sqlite> UPDATE weather_measurements SET tavg = NULLIF(tavg, '');
sqlite> .quit
```

You are now prepared to run the example file.

This CSV file was acquired from the National Centers for Environmental Information (NOAA) whose original dataset can be found [https://www.ncdc.noaa.gov/cdo-web/datasets#GHCND](here).

## Running the examples

### `average.js`

This file contains two functions to demonstrate caching entries from a database.  `getAverage()` retrieves the average daily average temperature recorded from numerous weather stations within Iceland recorded since 2010. Timing is collected during the function execution and added to the returned JSON object.

Ensure Redis is running, then run the `averages.js` file once.  Since there is no cache entry, the function will retrieve the data from the database.

```bash
$ node average.js
{
  'AVG(TAVG)': 41.85745350929814,
  source: 'database',
  responseTime: '1735ms'
}
```

The code will have placed a copy of the entry in the Redis cache, so the next function execution should return data from the cache.

```bash
$ node average.js
{
  'AVG(TAVG)': 41.85745350929814,
  source: 'cache',
  responseTime: '2ms'
}
```
## Shutting Down Redis (Docker)

If you're using Docker, and want to shut down the Redis container when you are finished with the application just use:
```bash
$ docker-compose down
```
