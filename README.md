# Caching
Simple caching examples with Redis!

## Prerequisites
- Node.js
- SQLite
- SQLite3
- Redis
- ioredis

## Installing this application

Clone the repository to your computer:

```bash
$ git clone https://github.com/redis-developer/redis-caching-slow-database-queries
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

For Docker:
```bash
$ docker run -p 6379:6379 --name redis6 -d redis:6 
```

Ensure you have SQLite3 installed.

### Unzip and import data to the SQLite `weather` table:

This CSV file was acquired from the National Centers for Environmental Information (NOAA) can be found [https://www.ncdc.noaa.gov/cdo-web/datasets#GHCND](here).

Unzip the weather.csv.zip file:
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
<br/>
<br/>

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

