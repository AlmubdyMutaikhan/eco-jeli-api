const { Router } = require("express");
const UserController = require('../controllers/user.controller');
const userRoute = Router();


userRoute.get('/all', UserController.getAllUsers);
userRoute.post('/remove', UserController.deleteUser);


module.exports = userRoute;