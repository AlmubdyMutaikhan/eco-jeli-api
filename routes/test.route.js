const { Router } = require('express');
const TestController = require('../controllers/test.controller');
const testRoute = Router();

testRoute.post('/js', TestController.compileJs);

module.exports = testRoute;