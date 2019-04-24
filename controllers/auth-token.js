require('dotenv').config();
let jwt = require('jsonwebtoken')

let validToken = function(req,res,next){
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            msg:"Token is not found"
        });
    }

    if (token.startsWith('Bearer ')){
        token = token.slice(7,token.length);
    }

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
            if (err){
                return res.status(401).json({
                    msg:"Not valid Token"
                });
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        return res.status(406).json({
            msg: "Token is not present"
        });
    }
}

module.exports = {
    validToken: validToken
}