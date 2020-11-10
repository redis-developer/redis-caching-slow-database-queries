const sqlite3 = require('sqlite3').verbose();
const constants = require('../constants.js');
const db = new sqlite3.Database(constants.sqlite_database);
const courses = require('./data.json');

const sql = `INSERT INTO courses (
              title, 
              description, 
              index_description,
              course_number,
              course_name)
              VALUES(?, ?, ?, ?, ?)`
const create_table = `
            CREATE TABLE courses(
              title text, 
              description text, 
              index_description text, 
              course_number text, 
              course_name text, 
              course_id INTEGER PRIMARY KEY
            )`
db.serialize(() => {
  db
    .run('DROP TABLE IF EXISTS courses')
    .run(create_table)
    courses.forEach( course => 
      db.run(sql, Object.values(course), (err, succ) => {
      return err 
        ? console.err(err.message)
        : console.log(`Course ${course.course_number} inserted succesfully`);
  }))
 });
