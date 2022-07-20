const { Router } = require("express");
const ClubController = require('../controllers/club.controller');
const clubRoute = Router();

clubRoute.get('/', ClubController.retrieveClubData);
clubRoute.put('/', ClubController.updateClubStruct);
module.exports = clubRoute;