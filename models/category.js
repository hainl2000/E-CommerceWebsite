const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    nameCategory : {
        type : String,
        required : true
    }
},{
    collection: 'Category',
    versionKey: false
});



const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;