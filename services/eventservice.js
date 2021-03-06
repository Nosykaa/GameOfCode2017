const database = require('./db');

class eventService {

  save (event) {
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {
        event.history = [];
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

  getEventsByTag(tag) {
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {

        db.collection('event').find({ tags : tag }).toArray(function(err, events){
          if (err) {
            return reject(err);
          }
          if (!events) {
            return reject({
              code: 404,
              message: 'events not found. Invalid events'
            });
          }
          console.log("try" + events)

          resolve(events);
        });
      }).catch(reject);
    });
  }

  getEventsByGeoLocation(long,lat){
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {     
        let longFloatL =    parseFloat(long) - 0.01;
        let longFloatU =    parseFloat(long) + 0.01;
        let latFloatL =    parseFloat(lat) - 0.01;
        let latFloatU =    parseFloat(lat) + 0.01;

        db.collection('event').find({ 
            longitude : { $gt :  longFloatL.toString(), $lt : longFloatU.toString()},
            latitude : { $gt :  latFloatL.toString(), $lt : latFloatU.toString()}
            }).toArray(function(err, events){
          if (err) {
            return reject(err);
          }
          if (!events) {
            return reject({
              code: 404,
              message: 'events not found. Invalid events'
            });
          }
          console.log("try" + events)

          resolve(events);
        });
      }).catch(reject);
    });
  }

  addInterest(ipAddress, uid) {
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
          delete event._id;
          let obj = {
            ipAddress : ipAddress,
            timestamp : new Date()
          }
          event.history.push(obj); 
          db.collection('event').updateOne({ "UID": uid }, { $set: event }, (err, result) => {
                if (err) {
                  return reject(err);
                }
                if (result.nb === 0) {
                  return reject('Unable to update the event');
                }
                resolve(result);
          });

        });
      }).catch(reject);

    
    });   
   }


  getInterest(uid){
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {
      let d = new Date(),
      n = d.getDate();
      d.setMonth(d.getMonth() - 6);
   
      console.log(d);
        let count = db.collection('event').find({ UID : uid,"history.timestamp": { $gte : new Date(d) }}).count()
        resolve(count);
        }).catch(reject);
      });
  }

   getDistinctEventTags(){
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {
       let dis = db.collection('event').distinct("tags");
        resolve(dis);
        }).catch(reject);
      });
  }

}

        
module.exports = new eventService();

