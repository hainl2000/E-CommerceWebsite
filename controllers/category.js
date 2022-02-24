const CategoryModel = require('../models/category');

const createCategory = (req,res,next)=>{
    let nameCategory = req.body.nameCategory;
    console.log("Add new category "+ nameCategory);
    CategoryModel.create({
        nameCategory: nameCategory
    }).then(data =>{
        return res.status(201).json({
            message : "Add new category succesfully"
        })
    }).catch(err =>{
        // console.log(err);
        return res.status(500).json({
            message: "Add new category fail",
        });
    })
};

const getListCategories = (req,res,next) =>{
    CategoryModel.find({

    }).then(listCategories =>{
        return res.status(200).json({
            listCategories : listCategories 
        })
    }).catch(err => {
        console.log(error);
        return res.status(500).json({
            message: "Error",
        });
    });
}

module.exports = {
    createCategory,
    getListCategories
}