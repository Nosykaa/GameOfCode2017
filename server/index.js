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

app.listen(process.env.NODE_PORT, () => {
  console.log('Server getMeOut App listenning on port ' + process.env.NODE_PORT);
  initFactory();
});


function initFactory() {
  let database = require('./services/db');
  fs.readFileSync('event.csv', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    if (data == undefined || data.length == 0) {
					console.log("no file");
					return;
		}
    var fieldList = data.split(';').filter(Boolean);
    database.getDb()
      .then(db => {
          db.collection('event').deleteMany({});
          /*for (let i = 0;fieldList.fields.lenght; i++) {
            db.collection('event').insertOne(jsonData.fields, err => {
                if (err) {
                  throw err;
                }
              });
          }*/
      })
      .catch(err => {
        throw err;
      });
  }); 
  
}
