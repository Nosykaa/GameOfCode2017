const database = require('./db');

class loggingService {

  save (logging) {
    return new Promise((resolve, reject) => {
      database.getDb().then(db => {
              db.collection('logging').insertOne(logging, (err, result) => {
                if (err) {
                  return reject(err);
                }
                resolve(result._id);
              });
            }).catch(reject);;
    });
  }
}