const database = require('./db');

class eventService {

  save (event) {
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {

        db.collection('event').findOne({ "event": event }, (err, result) => {
            if (err) {
              return reject(err);
            }
            if (!result) {
              db.collection('event').insertOne(event, (err, result) => {
                if (err) {
                  return reject(err);
                }
                resolve(result._id);
              });
            }
          });
      }).catch(err => reject(err));
    });
  }

  getEventsById(id) {
    return new Promise((resolve, reject) => {

      database.getDb().then(db => {
        db.collection('event').findOne({ "id": id }, (err, user) => {
          if (err) {
            return reject(err);
          }
          if (!user) {
            return reject({
              code: 404,
              message: 'Event not found. Invalid event'
            });
          }
          resolve(user);
        });
      }).catch(reject);
    });
  }

  getEventsByGeoLocation(long,lat){
    return new Promise((resolve, reject) => {

      database.getDb().then(db => {
          long 
        db.collection('event').findAll({"long": long},{"lat": lat}, (err, contract) => {
          if (err) {
            return reject(err);
          }
          resolve(contract.eventService);
        });
      }).catch(reject);
    });
  }
}

module.exports = new eventService();

