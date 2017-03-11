/**
 * @module server/api/subscription
 * @requires module:server/services/blockchain/subscription
 * @requires module:server/api/helper
 */

const eventService = require('../services/event');
const apiHelper = require('./helper');

module.exports = (app) => {

//callback 
  app.post('/event/addevent', (req, res) => {
      
    if (!req.body.event)
      return apiHelper.formatError(res, {code: 403, message:'Event object is required'});
      eventService.save(req.body.event)
      .then(() => res.status(200).end())
      .catch(err =>  apiHelper.formatError(res, err));
  });

  app.get('/event/:id', (req, res) => {
      eventService.getEventsById(req.params.id)
      .then(user => res.status(200).json(user))
      .catch(err =>  apiHelper.formatError(res, err));
  });

  app.get('/event/:long/:lat', (req, res) => {
      eventService.getEventsByGeoLocation(req.params.long,req.params.lat)
      .then(user => res.status(200).json(user))
      .catch(err =>  apiHelper.formatError(res, err));
  });

 };