const AccountModel = require('../models/user');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const authorizeAdmin = (req,res,next) =>{
    try{
        const tokenUserId = req.cookies.userId;
        // console.log('id ' ,req.cookies.userId);
        if(!tokenUserId){
            console.log("Stop o day ");
            return res.status(403).send({
                message: "Not login"
            })
        }
        const userId  = jwt.verify(tokenUserId,process.env.JWT_KEY);
        AccountModel.findOne({
            _id : userId.userId
        }).then(data =>{
            if(data.role == 0){
                console.log("Login = admin account");
                req.userId = data._id;
                return next();
            }
            else{
                // console.log("Stop o day 1");
                return res.status(403).send({
                    message: "Not login = admin account"
                })
            }
        })
    }catch {
        console.log("1111111111111");
        return res.status(500).json({
            message: "Error mtfk"
        });
    }
}

const authorizeUser = (req,res,next) =>{
    const tokenUserId = req.cookies.userId;
    // console.log(req);
    // console.log(req.cookies);
    console.log(tokenUserId);
    if(!tokenUserId){
        // console.log("Stop o day ");
            return res.status(403).send({
                message: "Not login"
            })
    }
    try{
        const userId  = jwt.verify(tokenUserId,process.env.JWT_KEY);
        AccountModel.findOne({
            _id : userId.userId
        }).then(data =>{
            if(data.role == 1 || data.role == 0){
                console.log("Login = user account");
                req.userId = data._id;
                return next();
            }
            else{
                // console.log("Stop o day 1");
                return res.status(403).send({
                    message: "Not login = user account"
                })
            }
        })
    }catch(err) {
        console.log(err);
        return res.sendStatus(500).json({
            message: "Error mtfk"
        });
    }
};


module.exports = {
    authorizeAdmin,
    authorizeUser
}