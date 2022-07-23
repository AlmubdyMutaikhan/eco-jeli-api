const {Router} = require('express');
const eventRoute = Router();
const eventController = require('../controllers/event.controller');
const authMid = require('../middleware/auth.mid');

eventRoute.get('/all', eventController.getAllEvents);
eventRoute.post('/new', authMid.checkAuth, eventController.postEvent);
eventRoute.delete('/:eventID', authMid.checkAuth, eventController.deleteEvent);
eventRoute.put('/:eventID', authMid.checkAuth, eventController.updateEvent);
eventRoute.get('/:blogID', authMid.checkAuth, eventController.getEvent);

module.exports = eventRoute;