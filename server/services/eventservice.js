const database = require('./db');

class eventService {

  save (event) {
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {
              db.collection('event').insertOne(event, (err, result) => {
                if (err) {
                  return reject(err);
                }
                resolve(result._id);
              });
            }).catch(reject);;
    });
  }
  

  getEventsById(uid) {
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {

        db.collection('event').findOne({ UID : uid }, (err, event) => {
          if (err) {
            return reject(err);
          }
          if (!event) {
            return reject({
              code: 404,
              message: 'Event not found. Invalid event'
            });
          }
          resolve(event);
        });
      }).catch(reject);
    });
  }

 

  getEventsByGeoLocation(long,lat){
    return new Promise((resolve, reject) => {

      database.getDb().then(db => {        
        db.collection('event').findAll({"long": long},{"lat": lat}, (err, events) => {
          if (err) {
            return reject(err);
          }
          resolve(events);
        });
      }).catch(reject);
    });
  }
}

module.exports = new eventService();

