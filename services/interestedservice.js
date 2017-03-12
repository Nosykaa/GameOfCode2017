const database = require('./db');

class interestedService {

  save (interested) {
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {
              db.collection('interested').insertOne(interested, (err, result) => {
                if (err) {
                  return reject(err);
                }
                resolve(result._id);
              });
            }).catch(reject);;
    });
  }
}