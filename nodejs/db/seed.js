const { text } = require('express');
const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
const sqlite3 = require('sqlite3').verbose();
const constants = require('../constants.js');
const db = new sqlite3.Database(constants.sqlite_database);
const courses = require('./data.json');
const CSV_PATH = constants.weather_csv;

// const weather_csv =  fs.readFile(CSV_PATH).then(file => console.log(file.length));





const insert_weather_record = `INSERT INTO weather (
              STATION ,
              NAME ,
              LATITUDE ,
              LONGITUDE ,
              ELEVATION ,
              DATE ,
              AWND , AWND_ATTRIBUTES ,
              DAPR , DAPR_ATTRIBUTES ,
              FMTM , FMTM_ATTRIBUTES ,
              MDPR , MDPR_ATTRIBUTES ,
              PGTM ,PGTM_ATTRIBUTES ,
              TAVG , TAVG_ATTRIBUTES ,
              TMAX , TMAX_ATTRIBUTES ,
              TMIN , TMIN_ATTRIBUTES ,
              TOBS , TOBS_ATTRIBUTES ,
              WDF2 , WDF2_ATTRIBUTES ,
              WDF5 , WDF5_ATTRIBUTES ,
              WSF2 , WSF2_ATTRIBUTES ,
              WSF5 , WSF5_ATTRIBUTES ,
              WT01 , WT01_ATTRIBUTES ,
              WT02 , WT02_ATTRIBUTES ,
              WT03 , WT03_ATTRIBUTES ,
              WT04 , WT04_ATTRIBUTES ,
              WT05 , WT05_ATTRIBUTES ,
              WT07 , WT07_ATTRIBUTES ,
              WT08 , WT08_ATTRIBUTES ,
              WT09 , WT09_ATTRIBUTES ,
              WT11 , WT11_ATTRIBUTES ,
              WT13 , WT13_ATTRIBUTES ,
              WT14 , WT14_ATTRIBUTES ,
              WT16 , WT16_ATTRIBUTES ,
              WT19 , WT19_ATTRIBUTES )
              VALUES(?, ?, ?, ?, ?, ?, ? , ? , ? , ? , ? , ? , ? , ? , ? ,? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )`

const create_weather_table = `CREATE TABLE weather(
              STATION text,
              NAME text,
              LATITUDE real,
              LONGITUDE real,
              ELEVATION real,
              DATE text,
              AWND real, AWND_ATTRIBUTES text,
              DAPR integer, DAPR_ATTRIBUTES text,
              FMTM text, FMTM_ATTRIBUTES text,
              MDPR text, MDPR_ATTRIBUTES text,
              PGTM integer,PGTM_ATTRIBUTES text,
              TAVG integer, TAVG_ATTRIBUTES text,
              TMAX integer, TMAX_ATTRIBUTES text,
              TMIN integer, TMIN_ATTRIBUTES text,
              TOBS integer, TOBS_ATTRIBUTES text,
              WDF2 integer, WDF2_ATTRIBUTES text,
              WDF5 integer, WDF5_ATTRIBUTES text,
              WSF2 integer, WSF2_ATTRIBUTES text,
              WSF5 integer, WSF5_ATTRIBUTES text,
              WT01 integer, WT01_ATTRIBUTES text,
              WT02 integer, WT02_ATTRIBUTES text,
              WT03 integer, WT03_ATTRIBUTES text,
              WT04 integer, WT04_ATTRIBUTES text,
              WT05 integer, WT05_ATTRIBUTES text,
              WT07 integer, WT07_ATTRIBUTES text,
              WT08 integer, WT08_ATTRIBUTES text,
              WT09 integer, WT09_ATTRIBUTES text,
              WT11 integer, WT11_ATTRIBUTES text,
              WT13 integer, WT13_ATTRIBUTES text,
              WT14 integer, WT14_ATTRIBUTES text,
              WT16 integer, WT16_ATTRIBUTES text,
              WT19 integer, WT19_ATTRIBUTES text
            )`

const insert_bulk = `BULK INSERT weather
                      FROM './weather.csv'
                      WITH
                      (
                          FIRSTROW = 2,
                          FIELDTERMINATOR = ',',  --CSV field delimiter
                          ROWTERMINATOR = '\n',   --Use to shift the control to next row
                          TABLOCK
                      )`

async function main(){
  console.log(' I am a function');
  const content = await fs.readFile('./db/weather.csv', 'utf-8')
  const records = parse(content)
  db.serialize(() =>{
    db.run('DROP TABLE IF EXISTS weather')
      .run(create_weather_table)
      let stmt = db.prepare(insert_weather_record);
        records.forEach(record => {
          stmt.run(Object.values(record));
        });
      stmt.finalize();
  });
    //   .run(create_weather_table)
    //   db.run(insert_weather_record, Object.values(record))
    // })
};
// //     records.forEach(record => {
// //       db.run(sql, Object.values(course), (err, succ) => {
// //         //   return err 
// //       //     ? console.err(err.message)
// //       //     : console.log(`Course ${course.course_number} inserted succesfully`);
// //       })
// // // const json = records.map( JSON.stringify ).join('\n')
// // // fs.writeFile('output.json', json)
// //   })
// // })
//   // })


main()


// console.log(weather_csv.length);
// db.serialize(() => {
//   db
//     .run('DROP TABLE IF EXISTS weather')
//     .run(create_weather_table)
//     .run('.import "./weather.csv"'
//       + 'INTO TABLE weather'
//       + 'FIELDS TERMINATED BY ","'
//       + 'ENCLOSED BY "\""'
//       + 'LINES TERMINATED BY \'\\n\''
//       + 'IGNORE 1 ROWS'
//       + ')');

//     // .run(create_table)
//     // courses.forEach( course => 
//     //   db.run(sql, Object.values(course), (err, succ) => {
//     //   return err 
//     //     ? console.err(err.message)
//     //     : console.log(`Course ${course.course_number} inserted succesfully`);
// });

