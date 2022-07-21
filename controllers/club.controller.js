const Club = require('../models/Club.model');
const User = require('../models/User.model');
const Token = require('../helpers/token');

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
                name:data.clubName,
                logo:data.logo,
                description:data.description,
        }});
        res.status(201).send({"msg":"ok"});
    } catch(err) {
        console.log(err);
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}

const getAllClubs = async (req, res) => {
    try {
        const adminToken = req.query.token;
        const payload = Token.decodeToken(adminToken);
        const adminUser = await User.findById(payload.userID);
        console.log(adminUser);
        if(adminUser && (adminUser.accessLvL === 'root' || 
                                    adminUser.accessLvL === 'mid')) {
            const club = await Club.find({})
                                        .populate('leader')
                                            .exec();

            res.status(201).send({msg:'ok', club});
        } else {
            throw new Error('Access forbidden | code: 3361');
        }

    } catch(err) {
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}

module.exports = {
    retrieveClubData,
    updateClubStruct,
    saveClubData,
    getAllClubs
}