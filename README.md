# Caching
Simple caching examples with Redis!

## Prerequisites
- Node.js
- SQLite
- SQLite3
- Redis
- ioredis
- [Open Weather Map API Key ](https://openweathermap.org/api)

## Installing this application

Clone the repository to your computer:

```bash
git clone https://github.com/redislabs-training/caching
```

Navigate to the NodeJS folder
```bash
cd nodejs
```

Install the required packages from the /nodejs folder:
```bash
npm install 
```

Add the Open Weather Map API Key to your Environment Variables:
```bash
export WEATHER_API_KEY=<your api key>
```

## Database Preparation

Ensure you have Redis installed and running.

For Docker:
```bash
$ docker run -p 6379:6379 --name redis6 -d redis:6 
```

Ensure you have SQLite3 installed.

The following command will unzip and import data to the SQLite `weather` table

Unzip the weather.csv.zip file
```bash
$ gzip -d db/weather.csv.zip
```

Run the Sqlite3 command line interface to import the `weather.csv` file and set empty `TMAX` values to `NULL`:
```bash
$ sqlite3
sqlite> .open db/weather.db
sqlite> .mode csv
sqlite> .import db/weather.csv weather
sqlite> UPDATE weather SET TMAX = NULLIF(TMAX, '');
sqlite> .quit
```

You are now prepared to run the two example files.
<br/>
<br/>

## Running the examples

### `average.js`

This file contains two functions to demonstrate caching entries from a database.  `getAverage()` retrieves the average daily maximum temperature recorded from numerous weather stations within Oakland, California, USA recorded since 2010. Timing is collected during the function execution and added to the returned JSON object.

Ensure Redis is running, then run the `averages.js` file once.  Since there is no cache entry, the codebase will retrieve the data from the database.

```bash
$ node average.js
{
  'AVG(TMAX)': 66.92141005472713,
  source: 'database',
  responseTime: '23ms'
}
```

The code will have placed a copy of the entry in the Redis cache, so the next function execution should return data from the cache.

```bash
$ node average.js
{
  'AVG(TMAX)': 66.92141005472713,
  source: 'cache',
  responseTime: '10ms'
}
```

---

### `api.js`

This file contains logic to demonstrate caching entries from a weather service API.  You will need a free API key of your own to run this demonstration. Keys can be obtained by following the instructions at the [Open WeatherMap API](https://openweathermap.org/api) site.  The `getWeather()` function retrieves a JSON object containing real-time meteoroligical information on a given city. This example uses Oakland as a parameter, but any city can be substituted.

Ensure Redis is running, then run the `api.js` file once.  Since there is no cache entry, the codebase will retrieve the data from the Open Weather Map API.

```bash
$ node api.js
{
  coord: { lon: -83.4, lat: 42.67 },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d'
    }
  ],
  ...
  source: 'API',
  responseTime: '180ms'
}
```

The code will have placed a copy of the entry in the Redis cache, so the next function execution should return data from the cache. Note that the cached entry has a `TTL` (Time To Live) of one hour. Weather can change frequently, so an hour should provide a reasonable approximation of the current conditions. After an hour, the cache entry will be deleted and a new cache entry will need to be stored. This ensures fresh, relevant data.

```bash
$ node api.js
{
  coord: { lon: -83.4, lat: 42.67 },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d'
    }
  ],
  ...
  source: 'cache',
  responseTime: '9ms'
}
```
