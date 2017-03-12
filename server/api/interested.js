/**
 * @module server/api/subscription
 * @requires module:server/services/blockchain/subscription
 * @requires module:server/api/helper
 */

const eventService = require('../services/interestedservice');
const apiHelper = require('./helper');

module.exports = (app) => {

//callback 
  app.post('/event/addinterested', (req, res) => {
      
    if (!req.body.interested)
      return apiHelper.formatError(res, {code: 403, message:'Interested object is required'});
      interestedservice.save(req.body.interested)
      .then(() => res.status(200).end())
      .catch(err =>  apiHelper.formatError(res, err));
  });

 };