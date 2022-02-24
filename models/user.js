const mongoose = require('mongoose');
const ProductModel = require('./product');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {
        type: String,
        required: true,
        match : /^[a-zA-Z ]+$/
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        // default: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    cart: {
        items: [{
            _id : false,
           productId: {
               type: mongoose.Types.ObjectId,
               ref: 'Product',
               required : true
           },
           quantity: {
               type :Number,
               required: true
           }
        }],
    }
    // listOrder: [{
    //     _id : false,
    //     orderID:{
    //         type: mongoose.Types.ObjectId,
    //         ref: 'Order',
    //         required: true
    //     }
    // }]
}, {
    collection: 'User',
    versionKey: false
});

const AccountModel = mongoose.model('User', AccountSchema);

module.exports = AccountModel;
