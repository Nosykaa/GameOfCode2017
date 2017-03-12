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
  

  getEventsById(id) {
    return new Promise((resolve, reject) => {

      database.getDb().then(db => {
        db.collection('event').findOne({ "_id": id }, (err, event) => {
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
        db.collection('event').find(location,{ $near :
          {
            $geometry: { type: "Point",  coordinates: [{"long": long},{"lat": lat} ] },
            $minDistance: 50,
            $maxDistance: 5000
          }
       });
      }).catch(reject);
    });
  }
}

        
module.exports = new eventService();

