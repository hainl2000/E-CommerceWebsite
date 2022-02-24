const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomId :{
        type: String,
        required:true,
        unique: true
    },
    messages:[{
        _id:false,
        msg: {
            type: mongoose.Types.ObjectId,
            ref:'Message',
        },
    }],
    last_message:{
        type: String,
    },
    roomName: {
        type: String
    }
},{
    collection: 'Room',
    versionKey: false
});


const RoomModel = mongoose.model('Room',RoomSchema);

module.exports = RoomModel;