const User = require('../models/User.model');
const Club = require('../models/Club.model');
const Password  = require('../helpers/password');
const Token = require('../helpers/token');

// Only root admin can create other admin roles
const createAdminUser = async (req, res) => {
        req.body.accessLvL = "mid";
        req.body.role="moderator";
}

// Only root and other admins can create club leaders
const createClubLeader = async (req, res) => {
        req.body.accessLvL = "low";
        req.body.role="admin";

}


const createUser = async (req, res) => {
    try {
        const rootAdminToken = req.query.token;
        const payload = Token.decodeToken(rootAdminToken);
        const rootAdminUser = await User.findById(payload.userID);

        const existingUser = await User.findOne({email : req.body.email});
        if(existingUser) { throw new Error("this email already exists") }
        console.log(rootAdminUser);

        if(req.body.userType === 'admin') {
            if(rootAdminUser.accessLvL === 'root') {
                createAdminUser(req, res);
                const plainPwd = req.body.password;
                req.body.password = await Password.hashPassword(req.body.password);
                await User.create(req.body);
                res.status(201).send({  msg:'ok',
                                        email:req.body.email, 
                                        pwd:plainPwd});
            } else {
                throw new Error("Access forbidden | code:3369");
            }
        } else if(req.body.userType === 'leader') {
            if(rootAdminUser.accessLvL === 'root' || rootAdminUser.accessLvL === 'mid') {
                createClubLeader(req, res);
                const userClub = await Club.create({});
    
                const plainPwd = req.body.password;
                
                req.body.password = await Password.hashPassword(req.body.password);
                const leaderUser = await User.create(req.body);
                leaderUser.club = userClub._id;
                userClub.leader = leaderUser._id;
                await userClub.save();
                await leaderUser.save();

                res.status(201).send({  msg:'ok',
                                        email:req.body.email, 
                                        pwd:plainPwd});

            } else {
                throw new Error("Access forbidden | code:3371");
            }
        } else {
            throw new Error('Unspecified type | code:3375');
        }
    } catch(err) {
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}

const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const existingUser = await User.findOne({email : req.body.email});
        if(!existingUser) { throw new Error("incorrect email or password") }

        const passwordIdentity = await Password.comparePasswords(req.body.password, existingUser.password);
        if(!passwordIdentity) { throw new Error("incorrect email or password") }
        
        const token = Token.generateToken({auth:true, user:existingUser});
        res.status(201).send({"msg":"ok", token, userID:existingUser._id});
    } catch(err) {
        console.log(err);
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}

const getPayload = async (req, res) => {
    const token = req.query.token;
    const payload = Token.decodeToken(token);
    res.status(200).send({"msg":"ok", payload }); 
} 


module.exports = {
    createUser,
    loginUser,
    getPayload
}