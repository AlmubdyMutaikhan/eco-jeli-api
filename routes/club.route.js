const { Router } = require("express");
const ClubController = require('../controllers/club.controller');
const clubRoute = Router();


clubRoute.get('/all', ClubController.getAllClubs);
clubRoute.get('/', ClubController.retrieveClubData);
clubRoute.put('/', ClubController.updateClubStruct);
clubRoute.post('/', ClubController.saveClubData);

module.exports = clubRoute;