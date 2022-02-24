const jwt = require("jsonwebtoken");

const RoomModel = require('../models/room');
const MessageModel = require('../models/message');
const AccountModel = require('../models/user');

const loadMessages = async(roomId) => {
    try{
        let listMessages = [];
        let listMsgs = [];
        let restrictedFields ={
            _id : false
        }
        const room = await RoomModel.findOne({
            roomId : roomId
        });
        for(let i=0;i<room.messages.length;i++)
        {
            listMsgs[i] = room.messages[i].msg;
        }
        console.log(room.messages.length);
        let msgs = await MessageModel.find({
            _id: {$in : listMsgs}
        });

        // let msgs = await MessageModel.findById()
        // console.log( msgs);
        const admin = await AccountModel.findOne({
            role : 0
        });
        // console.log(admin);
        let userSent = await AccountModel.findOne({
            _id: roomId
        });
        console.log(userSent);
        msgs.forEach(msg =>{
            // console.log
            if(msg.from == roomId){
                listMessages.push({
                    userSent: userSent.username,
                    userSentID : userSent._id,
                    msg: msg.content,
                })
            }
            else{
                listMessages.push({
                    userSent: 'Admin',
                    userSentID : admin._id,
                    msg: msg.content,
                })
            }
        })
        return listMessages;
        // return res.status(200).json({
        //     listMessages: listMessages
        // });
    }catch(err){
        console.log('error 2');
    }
}

const getRoomList = async(req,res) => {
    let restrictedFieldsInRoom = {
        _id: false,
        messages : false
    }
    let roomList = await RoomModel.find({

    },restrictedFieldsInRoom);
    return res.status(200).json({
        roomList : roomList,
        message : "getRoomList successfully"
    })
};

// const loadMessages = async(req,res) => {
//     try{
//         let listMessages = [];
//         let listMsgs = [];
//         let restrictedFields ={
//             _id : false
//         }
//         const room = await RoomModel.findOne({
//             roomId : "62015ef0520a874058c9d571"
//         });
//         for(let i=0;i<room.messages.length;i++)
//         {
//             listMsgs[i] = room.messages[i].msg;
//         }
//         console.log(room.messages.length);
//         let msgs = await MessageModel.find({
//             _id: {$in : listMsgs}
//         });

//         // let msgs = await MessageModel.findById()
//         // console.log( msgs);
//         const admin = await AccountModel.findOne({
//             role : 0
//         });
//         // console.log(admin);
//         let userSent = await AccountModel.findOne({
//             _id: "62015ef0520a874058c9d571"
//         });
//         console.log(userSent);
//         msgs.forEach(msg =>{
//             // console.log
//             if(msg.from == "62015ef0520a874058c9d571"){
//                 listMessages.push({
//                     userSent: userSent.username,
//                     userSentID : userSent._id,
//                     msg: msg.content,
//                 })
//             }
//             else{
//                 listMessages.push({
//                     userSent: 'Admin',
//                     userSentID : admin._id,
//                     msg: msg.content,
//                 })
//             }
//         })
//         // msgs.forEach(async(msg)=>{
//         //     let userSent = await AccountModel.findById(msg.from);
//         //     // console.log(userSent);
//         //     listMessages.push({
//         //         msg: msg.content,
//         //         userSent: userSent.username,
//         //         userSentID : userSent._id
//         //     })
//         // });
//         // console.log(listMessages);
//         return res.status(200).json({
//             listMessages: listMessages
//         });
//     }catch(err){
//         console.log('error 2');
//     }
// }

module.exports = {
    loadMessages,
    getRoomList
}