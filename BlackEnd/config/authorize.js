const { json } = require('express');
const jwt = require('jsonwebtoken')  // ใช้งาน jwt module
const secretKey = "imissyou"
 
function getToken(json){
    return token = jwt.sign(json,secretKey,{
        expiresIn: 8640000
    });
}
function verifyToken(req, res, next){
    var token =  req.body.token;
    if(!token)
        return res.status(403).json({
            status: 403,
            message: "Non-access-token ",
          });
    jwt.verify(token, secretKey,function(err, decode){
        if(err)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
          });
    req.name = decode.name;
    req.role = decode.role;
    next();
    })
}
 
module.exports = {getToken, verifyToken}  // ส่ง middleware ฟังก์ชั่นไปใช้งาน