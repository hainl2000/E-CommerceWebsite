const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sentAt: {
        type: Date,
        default: Date.now()
    }
},{
    collection: 'Message',
    versionKey: false
});


const MessageModel = mongoose.model('Message',MessageSchema);

module.exports = MessageModel;