const User = require('../models/User.model');
const Token = require('../helpers/token');

const checkAuth = async  (req, res, next) => {
    try {
        const token = req.query.token;
        if(!token) {
            throw new Error('Access forbidden | Invalid token');
        }
        const payload = Token.decodeToken(token);
        const adminUser = await User.findById(payload.userID);
        if(!adminUser) {
            throw new Error('Access forbidden | code:3369');
        }

        if(adminUser.accessLvL !== 'root' && adminUser.accessLvL !== 'mid') {
            throw new Error('Access forbidden : code:3371');
        }
        next();
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}


module.exports = {
    checkAuth
}