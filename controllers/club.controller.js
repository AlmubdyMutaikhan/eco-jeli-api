const Club = require('../models/Club.model');

const retrieveClubData = async (req, res) => {
    try {
        const leaderID = req.query.leaderID;
        const club = await Club.findOne({leader:leaderID});
        res.status(201).send({"msg":"ok", club});
    } catch(err) {
        console.log(err);
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}

const updateClubStruct = async (req, res) => {
    try {
        const leaderID = req.body.leaderID;
        const club = await Club.findOne({leader : leaderID});
        club.members = req.body.members;
        await club.save();
        res.status(201).send({"msg":"ok"});
    } catch(err) {
        console.log(err);
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}

const saveClubData = async (req, res) => {
    try {
        const leaderID = req.body.leaderID;
        const data = req.body.club;
        
        await Club.findOneAndUpdate({leader:leaderID}, {$set:
            {
                city : data.city,
                name:data.name,
                logo:data.logo,
                description:data.description,
        }});
        res.status(201).send({"msg":"ok"});
    } catch(err) {
        console.log(err);
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}


module.exports = {
    retrieveClubData,
    updateClubStruct,
    saveClubData
}