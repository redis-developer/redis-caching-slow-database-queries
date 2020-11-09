const sqlite3 = require('sqlite3').verbose(),
      db = new sqlite3.Database('./db/sample.db'),
      Redis = require("ioredis"),
      redis = new Redis(6379, "127.0.0.1"),
      express = require('express'),
      app = express();

      app.listen(3000)

      let sql = `SELECT *
           FROM courses
           WHERE rowid  = ?`

// 1. Simple DB query with express.
// app.get('/:id', (request, response) => {
//   const id = request.params.id;
//   db.get(sql, [id],  (err, row) => {
//     if(err){
//       response.status(400).json(err);
//     }
//     console.log("Sending from database");
//     response.json(row);
//   });
// });

// 2. Simple DB query but check cache first, return from cache, else return from db.
// app.get('/:id', (request, response) => {
//   const rowid = request.params.id;
//   // first check cache
//   redis.get(`id:${rowid}`)
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

// 3. Simple DB query but check cache first,  return from cache, else return from db and store in cache.
// app.get('/:id', (request, response) => {
//   const rowid = request.params.id;
//   // first check cache
//   redis.get(`id:${rowid}`, (err, entry) => {
//     // return entry if a cache hit
//     if (entry) {
//       console.log('Sending from cache');
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



