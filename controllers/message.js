const jwt = require("jsonwebtoken");

const RoomModel = require('../models/room');
const MessageModel = require('../models/message');
const AccountModel = require('../models/user');

const sendMsg = async (roomId, userId, msg) => {
    try{

        const user = await AccountModel.findById(userId);
        const room = await RoomModel.findOne({
            roomId : roomId
        });
        const newMsg = new MessageModel({
            content: msg,
            from : userId,
            // sendAt : current.toISOString()
        });
        await newMsg.save((function (err) {
            if (err) {
                console.log(err);
                return err;
            }
            // saved!
        }));
        room.messages.push({
            msg : newMsg._id
        });

        room.last_message = newMsg.content;
        await room.save((function (err) {
            if (err) {
                console.log(err);
                return err;
            }
            // saved!
        }));
        const newMsgReceived = {
            content : newMsg.content,
            from : user.username,
            userSentId: user._id,
            sentAt : newMsg.sentAt
        };
        // console.log(room);
        return newMsgReceived;
    }catch(err) {
        // throw err;
        return err;
    }
}

module.exports = {
    sendMsg
}