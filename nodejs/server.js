// const constants = require('./constants.js')
// const axios = require('axios')
// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database(process.env.sqlite_db || './db/weather.db')
// const Redis = require('ioredis')
// const redis = new Redis({
//   port: process.env.redis_port || 6379,
//   host: process.env.redis_host || '127.0.0.1'
// })
// const express = require('express')
// const app = express()
// app.listen(process.env.express_port || 3000)



// const sql = `SELECT *
//            FROM courses
//            WHERE course_id  = ?`

// /*
//  1. Simple DB query with express.
// */
// app.get('/database-only/:course_id', (request, response) => {
//   const course_id = request.params.course_id;
//   db.get(sql, [course_id],  (err, row) => {
//     if(err){
//       response.status(400).json(err);
//     }
//     console.log("Sending from database");
//     response.json(row);
//   });
// });

// /*
//   2. Simple DB query but check cache first, return from cache, else return from db.
// */
// app.get('/read-only-cache/:course_id', (request, response) => {
//   const course_id = request.params.course_id;
//   // first check cache
//   redis.get(`course_id:${course_id}`)
//     .then((entry) => {
//       // return entry if a cache hit
//       if(entry){
//         console.log("Sending from cache");
//         response.json(entry);
//       }
//       // if there is a cache miss, then get from db
//       if(entry == null){
//         db.get(sql, [rowid],  (err, row) => {
//           if(err){
//             response.status(400).json(err);
//           }
//           console.log("Sending from database");
//           response.json(row);
//         });
//       } 
//     })
// });

// /*
//   3. Simple DB query but check cache first,  return from cache, else return from db and store in cache.\
// */
// app.get('/read-and-write-cache/:course_id', (request, response) => {
//   const course_id = request.params.course_id;
//   // first check cache
//   redis.get(`course_id:${course_id}`, (err, entry) => {
//     // return entry if a cache hit
//     if (entry) {
//       console.log("Sending from cache");
//       response.type('application/json').send(entry);
//     }
//     // if there is a cache miss, then get data from db
//     if (entry === null) {
//       db.get(sql, [rowid],  (err, row) => {
//         if(err){
//           response.json(err);
//         } else {
//           console.log("Sending from database");
//           response.json(row);
//           redis.set(`id:${rowid}`, JSON.stringify(row));
//         }
//       });
//     } 
//   });
// });
