const {Router} = require('express');
const reversoRoute = Router(); 
const reversoController = require('../controllers/reverso.controler');

reversoRoute.get('/', reversoController.getWord);

module.exports = reversoRoute;