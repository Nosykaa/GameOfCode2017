/**
 * @module server/api/subscription
 * @requires module:server/services/blockchain/subscription
 * @requires module:server/api/helper
 */

const eventService = require('../services/logging');
const apiHelper = require('./helper');

module.exports = (app) => {

//callback 
  app.post('/logging/addlogging', (req, res) => {
      
    if (!req.body.logging)
      return apiHelper.formatError(res, {code: 403, message:'Event object is required'});
      loggingService.save(req.body.logging)
      .then(() => res.status(200).end())
      .catch(err =>  apiHelper.formatError(res, err));
  });

 };