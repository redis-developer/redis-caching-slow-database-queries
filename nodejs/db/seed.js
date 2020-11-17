// const { text } = require('express');
// const fs = require('fs').promises;
// const parse = require('csv-parse/lib/sync');
// const sqlite3 = require('sqlite3').verbose();
// const constants = require('../constants.js');
// const db = new sqlite3.Database(constants.sqlite_database);
// const courses = require('./data.json');
// const CSV_PATH = constants.weather_csv;

// const insert_weather_record = `INSERT INTO weather (
//               STATION ,
//               NAME ,
//               LATITUDE ,
//               LONGITUDE ,
//               ELEVATION ,
//               DATE ,
//               AWND , AWND_ATTRIBUTES ,
//               DAPR , DAPR_ATTRIBUTES ,
//               FMTM , FMTM_ATTRIBUTES ,
//               MDPR , MDPR_ATTRIBUTES ,
//               PGTM ,PGTM_ATTRIBUTES ,
//               TAVG , TAVG_ATTRIBUTES ,
//               TMAX , TMAX_ATTRIBUTES ,
//               TMIN , TMIN_ATTRIBUTES ,
//               TOBS , TOBS_ATTRIBUTES ,
//               WDF2 , WDF2_ATTRIBUTES ,
//               WDF5 , WDF5_ATTRIBUTES ,
//               WSF2 , WSF2_ATTRIBUTES ,
//               WSF5 , WSF5_ATTRIBUTES ,
//               WT01 , WT01_ATTRIBUTES ,
//               WT02 , WT02_ATTRIBUTES ,
//               WT03 , WT03_ATTRIBUTES ,
//               WT04 , WT04_ATTRIBUTES ,
//               WT05 , WT05_ATTRIBUTES ,
//               WT07 , WT07_ATTRIBUTES ,
//               WT08 , WT08_ATTRIBUTES ,
//               WT09 , WT09_ATTRIBUTES ,
//               WT11 , WT11_ATTRIBUTES ,
//               WT13 , WT13_ATTRIBUTES ,
//               WT14 , WT14_ATTRIBUTES ,
//               WT16 , WT16_ATTRIBUTES ,
//               WT19 , WT19_ATTRIBUTES )
//               VALUES(?, ?, ?, ?, ?, ?, ? , ? , ? , ? , ? , ? , ? , ? , ? ,? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )`

// const create_weather_table = `CREATE TABLE weather(
//               STATION TEXT,
//               NAME TEXT,
//               LATITUDE REAL DEFAULT 'NULL',
//               LONGITUDE REAL DEFAULT 'NULL',
//               ELEVATION REAL DEFAULT 'NULL',
//               DATE TEXT,
//               AWND REAL DEFAULT 'NULL', AWND_ATTRIBUTES TEXT,
//               DAPR INTEGER DEFAULT 'NULL', DAPR_ATTRIBUTES TEXT,
//               FMTM TEXT, FMTM_ATTRIBUTES TEXT,
//               MDPR TEXT, MDPR_ATTRIBUTES TEXT,
//               PGTM INTEGER DEFAULT 'NULL',PGTM_ATTRIBUTES TEXT,
//               TAVG INTEGER DEFAULT 'NULL', TAVG_ATTRIBUTES TEXT,
//               TMAX INTEGER DEFAULT 'NULL', TMAX_ATTRIBUTES TEXT,
//               TMIN INTEGER DEFAULT 'NULL', TMIN_ATTRIBUTES TEXT,
//               TOBS INTEGER DEFAULT 'NULL', TOBS_ATTRIBUTES TEXT,
//               WDF2 INTEGER DEFAULT 'NULL', WDF2_ATTRIBUTES TEXT,
//               WDF5 INTEGER DEFAULT 'NULL', WDF5_ATTRIBUTES TEXT,
//               WSF2 INTEGER DEFAULT 'NULL', WSF2_ATTRIBUTES TEXT,
//               WSF5 INTEGER DEFAULT 'NULL', WSF5_ATTRIBUTES TEXT,
//               WT01 INTEGER DEFAULT 'NULL', WT01_ATTRIBUTES TEXT,
//               WT02 INTEGER DEFAULT 'NULL', WT02_ATTRIBUTES TEXT,
//               WT03 INTEGER DEFAULT 'NULL', WT03_ATTRIBUTES TEXT,
//               WT04 INTEGER DEFAULT 'NULL', WT04_ATTRIBUTES TEXT,
//               WT05 INTEGER DEFAULT 'NULL', WT05_ATTRIBUTES TEXT,
//               WT07 INTEGER DEFAULT 'NULL', WT07_ATTRIBUTES TEXT,
//               WT08 INTEGER DEFAULT 'NULL', WT08_ATTRIBUTES TEXT,
//               WT09 INTEGER DEFAULT 'NULL', WT09_ATTRIBUTES TEXT,
//               WT11 INTEGER DEFAULT 'NULL', WT11_ATTRIBUTES TEXT,
//               WT13 INTEGER DEFAULT 'NULL', WT13_ATTRIBUTES TEXT,
//               WT14 INTEGER DEFAULT 'NULL', WT14_ATTRIBUTES TEXT,
//               WT16 INTEGER DEFAULT 'NULL', WT16_ATTRIBUTES TEXT,
//               WT19 INTEGER DEFAULT 'NULL', WT19_ATTRIBUTES TEXT
//             )`

// const insert_bulk = `BULK INSERT weather
//                       FROM './weather.csv'
//                       WITH
//                       (
//                           FIRSTROW = 2,
//                           FIELDTERMINATOR = ',',  --CSV field delimiter
//                           ROWTERMINATOR = '\n',   --Use to shift the control to next row
//                           TABLOCK
//                       )`

// async function main(){
//   console.log(' I am a function');
//   const content = await fs.readFile('./db/weather.csv', 'utf-8')
//   const records = parse(content)
//   db.serialize(() =>{
//     db.run('DROP TABLE IF EXISTS weather')
//       .run(create_weather_table)
//       let stmt = db.prepare(insert_weather_record);
//         records.forEach(record => {
//           stmt.run(Object.values(record));
//         });
//       stmt.finalize();
//   });
// };
// main()


