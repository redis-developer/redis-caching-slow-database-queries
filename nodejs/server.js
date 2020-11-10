const constants = require('./constants.js')
const axios = require('axios')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(constants.sqlite_database)
const Redis = require('ioredis')
const redis = new Redis(constants.redis)
const express = require('express')
const app = express()
app.listen(constants.server_port, () => {
  console.log(`Server listening at port ${constants.server_port}`)
})



const sql = `SELECT *
           FROM courses
           WHERE course_id  = ?`


/*
 1. Simple DB query with express.
*/
app.get('/database-only/:course_id', (request, response) => {
  const course_id = request.params.course_id;
  db.get(sql, [course_id],  (err, row) => {
    if(err){
      response.status(400).json(err);
    }
    console.log("Sending from database");
    response.json(row);
  });
});

/*
  2. Simple DB query but check cache first, return from cache, else return from db.
*/
app.get('/read-only-cache/:course_id', (request, response) => {
  const course_id = request.params.course_id;
  // first check cache
  redis.get(`course_id:${course_id}`)
    .then((entry) => {
      // return entry if a cache hit
      if(entry){
        console.log("Sending from cache");
        response.type('application/json').send(entry);
      }
      // if there is a cache miss, then get from db
      if(entry == null){
        db.get(sql, [course_id],  (err, course) => {
          if(err){
            response.status(400).json(err);
          }
          console.log("Sending from database");
          response.json(course);
        });
      } 
    })
});

/*
  3. Simple DB query but check cache first,  return from cache, else return from db and store in cache.\
*/
app.get('/read-and-write-cache/:course_id', (request, response) => {
  const course_id = request.params.course_id;
  // first check cache
  redis.get(`course_id:${course_id}`, (err, entry) => {
    // return entry if a cache hit
    if (entry) {
      console.log("Sending from cache");
      response.type('application/json').send(entry);
    }
    // if there is a cache miss, then get data from db
    if (entry === null) {
      db.get(sql, [course_id],  (err, course) => {
        if(err){
          response.json(err);
        } else {
          console.log("Sending from database");
          response.json(course);
          redis.set(`course_id:${course_id}`, JSON.stringify(course));
        }
      });
    } 
  });
});

/* 
  4. API call to Open Weather Map. Results are cached for one hour for timeliness.
*/
app.get('/weather/:city', (request, response) => {
  const city = request.params.city
  // first check to see if we have this city in our cache
  redis.get(`weather:${city}`, (err, entry) => {
    // if we do, return the entry
    if (entry) {
      console.log("Sending from cache");
      response.type('application/json').send(entry);
    }
    // if we don't, fetch fresh data from the API
    if(entry===null) {
      const api_request = 
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${constants.w_api}`
  
      axios.get(api_request)
        .then(res => {
          const cache_string = JSON.stringify(res.data)
          // store the API result in the cache with a TTL of 1 hour
          redis.set(`weather:${city}`, cache_string, 'EX', 60*60)
          console.log("Sending from API")
          response.json(res.data)
        })
        .catch(err => console.error(err));
    }
  })
})
