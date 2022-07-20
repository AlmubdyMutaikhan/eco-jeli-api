const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const token = jwt.sign(
        data,
        "Wf@M95BkhaUwZi#Y3erQV$38h@xe&0",
        {
            expiresIn : '7h'
        });
    return token;
}

const decodeToken = (token) => {
    try {
        const payload = jwt.verify(token, "Wf@M95BkhaUwZi#Y3erQV$38h@xe&0");
        return payload;
    } catch(err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    generateToken,
    decodeToken
}