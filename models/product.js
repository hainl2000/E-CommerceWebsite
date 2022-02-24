const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    nameProduct : {
        type : String,
        required : true
    },
    imageURL: {
        type : String,
        required: true
    },
    quantity: {
        type: Number,
        required : true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default:false
    }
},{
    collection: 'Product',
    versionKey: false
});



const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;