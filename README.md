# Caching
Simple caching examples with Redis!

## Prerequisites
- Node.js
- SQLite
- Redis
- ioredis

## Installation

For the Nodejs project, navigate a command line to the `nodejs` folder.

```
npm install
```

Ensure you have SQLITE and Redis running. The following command will create data within the SQLITE `courses` table

```
node db/seed.js
```

Run the server

```
npm run start
```

## Running the example

Navigate to `localhost:3000/1` in your browser.

The command line will announce if the data has been fetched from the database or the cache.

Navigating to the same route more than once will give different cache results, based on which route you uncomment and use.

There are three routes in the `index.js` file:

- Route 1: a simple SQLite Query with no cache
- Route 2: a SQLite Query that first attempts to fetch the data from cache
- Route 3: a SQLITE Query that attempts to fetch from cache. If no data exists, the route pulls data from the database.  A cache entry is then made for future calls.
- Route 4: TODO: add TTL with EX command

