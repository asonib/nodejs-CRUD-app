const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');

    if(!token){
        return res.status(401).json({msg : 'User Not Authorized'});
    }

    try{
        const decode = jwt.verify(token, config.config.jwtSecret);
        console.log(decode);
        req.user = decode.data.user.id;

        next();
    }catch(err){
        return res.status(401).json({msg : 'User Token not valid'});
    }
}