const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    items: [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required : true
        },
        quantity: {
            type :Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    orderPrice :{
        type: Number,
        required: true
    },
    orderBy: {
        type : mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    collection: 'Order',
    versionKey: false
});



const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;