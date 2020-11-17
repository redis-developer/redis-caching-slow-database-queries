# Caching
Simple caching examples with Redis!

## Prerequisites
- Node.js
- SQLite
- Redis
- ioredis

## Database Preparation

Ensure you have Redis installed and running.

For Docker:
```bash
$ docker run -p 6379:6379 --name redis6 -d redis:6 
```

Ensure you have Sqlite3 installed.

The following command will unzip and import data to the SQLITE `weather` table

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

<br/>
<br/>

## Running the examples

### `average.js`

This file contains two functions to demonstrate caching entries from a database.  `getAverage()` retrieves the average daily maximum temperature recorded from numerous weather stations within Oakland, California, USA recorded since 2010. `getAverage_T()` contains performs the same function and includes the necessary code to demonstrate the amount of time (in milliseconds) the caching and database calls take.  

With both databases running, run the `averages.js` file  once.  Since there is no cache entry, the codebase will retrieve the data from the database.

```bash
$ node average.js
Sending from database: {"AVG(TMAX)":66.92141005472713}
```

The code will have placed a copy of the entry in the Redis cache, so the next function execution should return data from the cache.

```bash
$ node average.js
Sending from cache: {"AVG(TMAX)":66.92141005472713}
```

To run the function with timing, add the `timed` argument to the bash command. To clear the Redis cache, start the Redis command line in a new terminal window:

```bash
$ redis-cli
127.0.0.1:6379> flushdb
OK
```

Now run `average.js` again with the `timed` command:

```
$node average.js timed
Sending from database: {"AVG(TMAX)":66.92141005472713}
Response time: 16ms
```

A second run of the file should show the cached speed-up:

```
$node average.js timed
Sending from cache: {"AVG(TMAX)":66.92141005472713}
Response time: 8ms
```

---

### `api.js`

This file contains two functions to demonstrate caching entries from a weather service API.  You will need a free API key of your own to run this demonstration. Keys can be obtained by following the instructions at the [Open WeatherMap API](https://openweathermap.org/api) site.  The `getAverage()` function retrieves a JSON object containing real-time meteoroligical information ona  given city. This example uses Oakland as the example city.

`getAverage_T()` performs the same function and includes the necessary code to demonstrate the amount of time (in milliseconds) the caching and API calls take.  

With both databases running, run the `api.js` file once.  Since there is no cache entry, the codebase will retrieve the data from the Open Weather Map API.

```bash
$ node api.js
Sending from database: Sending from cache:  {
  coord: { lon: -83.4, lat: 42.67 },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04n'
    }
  ],
  ...
}

```

The code will have placed a copy of the entry in the Redis cache, so the next function execution should return data from the cache. Note that the cached entry has a `TLL` (Time To Live) of one hour. Weather can change frequently, so an hour should provide a reasonable approximation of the current conditions. After an hour, the cache entry will be deleted and a new cache entry will need to be stored. This ensures fresh, relevant data.

```bash
$ node api.js
Sending from cache: {
  coord: { lon: -83.4, lat: 42.67 },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04n'
    }
  ],
  ...
}
```

To run the function with timing, add the `timed` argument to the bash command. To clear the Redis cache, start the Redis command line in a new terminal window:

```bash
$ redis-cli
127.0.0.1:6379> flushdb
OK
```

Now run `api.js` again with the `timed command`:

```
$node api.js timed
Sending from api: {
  coord: { lon: -83.4, lat: 42.67 },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04n'
    }
  ],
  ...
}
Response time: 186ms
```

A second run of the file should show the cached speed-up:

```
$node api.js timed
Sending from cache: {
  coord: { lon: -83.4, lat: 42.67 },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04n'
    }
  ],
  ...
}
Response time: 8ms
```
