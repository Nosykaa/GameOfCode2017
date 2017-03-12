process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.NODE_PORT = process.env.NODE_PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));


//require('./api/event')(app);
require('./api/user')(app);
require('./api/event')(app);
require('./api/interested')(app);
require('./api/logging')(app);

app.listen(process.env.NODE_PORT, () => {
  console.log('Server getMeOut App listenning on port ' + process.env.NODE_PORT);
  initFactory();
});


function initFactory() {
  let database = require('./services/db');
  database.getDb()
    .then(db => {
      fs.readFile('event.csv', 'utf8', function (err, data) {
        if (err) {
              console.log("errrr")
              throw err;
        }
        if (data == undefined || data.length == 0) {
              console.log("errrr")
              throw "err";
        }
        let list = data.split('\n').filter(Boolean);
        db.collection('event').deleteMany({});
        for (let i = 1; i < (list.length); i++) {
          let line = list[i];
          let fieldList = line.split(';').filter(Boolean);
          
          let coordinates = [0,0];
          if (fieldList[4] != undefined && fieldList[4].length != 0) {
            coordinates = fieldList[4].split(', ').filter(Boolean);
          }
          let eventJSON = {
            UID: fieldList[0],
            title: fieldList[1],
            description: fieldList[2],
            startDate: fieldList[7],
            endDate: fieldList[8],
            tags: fieldList[3],
            longitude: coordinates[0],
            latitude: coordinates[1],
            address: fieldList[6],
            placeName: fieldList[5],
            history:[{ ipAddress : "31231231", timestamp : new Date()}]
          }
          db.collection('event').insertOne(eventJSON, err => {
            if (err) {
              console.log("errrr")
              throw err;
            }
          });
          
          
        }

      });
    })
    .catch(err => {
      throw err;
     });
  }
