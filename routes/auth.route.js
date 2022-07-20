const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const authRoute = Router();

authRoute.post('/signup', AuthController.createUser);
authRoute.post('/signin', AuthController.loginUser);
authRoute.get('/payload', AuthController.getPayload);

module.exports = authRoute;