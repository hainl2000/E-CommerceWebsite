const AccountModel = require('../models/user');
const RoomModel = require('../models/room');
const MessageModel = require('../models/message');
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { now } = require('mongoose');

const validateEmail = (email) => {
  return email.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );
};

const validateUsername = (username) =>{
    return username.match(
        /^[a-zA-Z ]+$/
    ); 
};

const Login = (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let tokenUserId;
    AccountModel.findOne({
        email: email
    }).then(user => {
        if (user) 
        {
            // console.log(user);
            Bcrypt.compare(password, user.password ,function (err,result) {
                if(err){
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if(result){
                    tokenUserId = jwt.sign({
                        userId: user._id
                    },process.env.JWT_KEY);
                    return res.cookie("userId",tokenUserId).status(200).json({
                        message: "Auth Successful",
                        role : user.role
                    })
                }
                else{
                    return res.status(406).json({
                        message: "PW failed"
                    })
                }
            })
        } 
        else {
            console.log("Not existed user");
            return res.status(406).json({
                message: "Auth failed",
            });
        }
    }).catch(error => {
        console.log(error);
        return res.status(500).json({
            message: "Error",
        });
    })
};




const Signup =async (req,res) =>{
    let username = req.body.username;
    let email = req.body.email;
    let password = await Bcrypt.hashSync(req.body.password,10);
    let tokenUserId;
    // console.log(validateEmail(email) +' ' + vlidateUsername(username));
    if(validateEmail(email) && validateUsername(username)){
        let user
        user = await AccountModel.findOne({
            email : email
        });
        // console.log(user);
        if(!user){
            user = new AccountModel({
                username : username,
                password : password,
                role : 1,
                email : email
            });
            await user.save((function (err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                // saved!
            }));
            tokenUserId = jwt.sign({
                userId: user._id
            },process.env.JWT_KEY);
            const admin = await AccountModel.findOne({
                role : 0
            });
            let message = new MessageModel({
                content : "Welcome to my web",
                from : admin?._id,
                sendAt : now()
            })
            await message.save((function (err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                // saved!
            }));
            let room = new RoomModel({
                roomId : user._id,
                messages: [{
                    msg : message._id
                }],
                lastMessage: message.content,
                roomName : user.username,
            });
            // await room.messages.push(message._id);
            // console.log(room.messages);
            // await room.messages.msg
            await room.save((function (err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                // saved!
            }));
            return res.cookie("userId",tokenUserId).status(201).json({
                message : "Signup Succesfully",
            })
        }
        else{
            console.log('Existed Gmail');
            return res.status(409).json({
                message: "Existed Gmail ",
            });
        }
    }else{
        return res.status(401).json({
            message: "Not valid username or email"
        })
    }
};


const Signout =(req,res) =>{
    return res.clearCookie("userId").status(200).json({
        message: "Logout succesfully"
    })
};

module.exports = {
    Login,
    Signup,
    Signout
}