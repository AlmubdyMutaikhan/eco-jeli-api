const User = require('../models/User.model');
const Token = require('../helpers/token');
const ClubModel = require('../models/Club.model');

const getAllUsers = async  (req, res) => {
    try {
        const adminToken = req.query.token;
        const payload = Token.decodeToken(adminToken);
        const adminUser = await User.findById(payload.userID);
    
        if(adminUser && (adminUser.accessLvL === 'root' || 
                                    adminUser.accessLvL === 'mid')) {
                const users = await User.find({});
                const usersRes = users.filter(user => {
                    return user.email !== 'sanim@admin.com' && (user._id+'') !== (adminUser._id+'')
                })

                res.status(201).send({msg:'ok', usersRes});
        } else {
            throw new Error('Access forbidden | code: 3361');
        }
    } catch(err) {
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const adminToken = req.body.token;
        const payload = Token.decodeToken(adminToken);
        const adminUser = await User.findById(payload.userID);
        const userID = req.body.userID;

        if(adminUser && (adminUser.accessLvL === 'root' || 
                                    adminUser.accessLvL === 'mid')) {
            await User.findByIdAndDelete(userID);
            await ClubModel.findOneAndDelete({leader:userID});
            res.status(201).send({msg:'ok'});
        } else {
            throw new Error('Access forbidden | code: 3361');
        }
    } catch(err) {
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}


module.exports = {
    getAllUsers,
    deleteUser
}