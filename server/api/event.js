/**
 * @module server/api/subscription
 * @requires module:server/services/blockchain/subscription
 * @requires module:server/api/helper
 */

const eventService = require('../services/eventservice');
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

  app.get('/event/oneByUID/:uid', (req, res) => {
      console.log(req.params.uid)
      eventService.getEventsById(req.params.uid)
      .then(user => res.status(200).json(user))
      .catch(err =>  apiHelper.formatError(res, err));
  });



  app.get('/event/byGeo/:long/:lat', (req, res) => {
      eventService.getEventsByGeoLocation(req.params.long,req.params.lat)
      .then(user => res.status(200).json(user))
      .catch(err =>  apiHelper.formatError(res, err));
  });

  app.post('/event/interest/:ipAddress/:uid', (req, res) => {    
      eventService.addInterest(req.params.ipAddress, req.params.uid)
      .then(() => res.status(200).end())
      .catch(err =>  apiHelper.formatError(res, err));
  });


  app.get('/event/interest/:uid', (req, res) => { 
      eventService.getInterest(req.params.uid)
      .then(user => res.status(200).json(user))
      .catch(err =>  apiHelper.formatError(res, err));
  });

  app.get('/event/distinctEventTags', (req, res) => { 
      eventService.getDistinctEventTags()
      .then(user => res.status(200).json(user))
      .catch(err =>  apiHelper.formatError(res, err));
  });

 };