const ProductModel = require('../models/product');
// var cookieParser = require('cookie-parser');

const getAllActiveProducts = (req,res,next) =>{
    // console.log('go to getAllProduct');
    let restrictedFields ={
        deleted : false
    }
    ProductModel.find({
        deleted : false
    },restrictedFields).then(data =>{
        // console.log(req.cookies.userId);
        res.status(200).json({
            'listActiveProducts' : data});
    }).catch(err =>{
        console.log(err);
    })
};

const createProduct = (req,res,next) =>{
    // console.log(req.body);
    var nameProduct = req.body.nameProduct;
    var imageURL = req.body.imageURL;
    var quantity = req.body.quantity;
    var price = req.body.price;
    var description = req.body.description;
    var category = req.body.category
    ProductModel.findOne({
        nameProduct : nameProduct 
    }).then(data=>{
        // console.log(data);
        if(data){
            console.log('Existed Product');
            res.status(409).json({
                message : "Existed product"
            })
        }
        else{
            console.log('Add Product Succesfully');
            ProductModel.create({
                nameProduct : nameProduct,
                imageURL : imageURL,
                quantity : quantity,
                category : category,
                price : price,
                description : description,
            });
            res.status(201).json({
                message: "Add Product Succesfully"
            })
        }
    }).catch(err =>{
        console.log(err);
        console.log('Add product Error');
        res.status(401).json({
            message : "Add Product Fail"
        })
    })
}

const updateProduct = (req,res,next) =>{
    console.log(req.body);
    var nameProduct = req.body.nameProduct;
    var imageURL = req.body.imageURL;
    var quantity = req.body.quantity;
    var price = req.body.price;
    var description = req.body.description;
    var category = req.body.category;
    try{
        ProductModel.findOneAndUpdate({_id : req.body.id},
            {   $set:{
                    nameProduct : nameProduct,
                    imageURL : imageURL,
                    price : price,
                    description : description,
                    quantity : quantity,
                    category: category
                }
            },(err,data)=>{
                if (err) 
                   return res.status(500).send(err);
                else{
                    console.log('data' , data);
                    if(data){
                        return res.status(200).send({
                            message : "Update product succesfully"
                        });
                    }
                    else{
                        return res.status(406).send({
                            message : "Not existed product | Error happens while updating"
                        })
                    }

                }
            })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Error",
        });
    }
};

const deleteProduct = (req,res,next) =>{
    // let productId = req.body.productId;
    // console.log("Product's id will be deleted is "+productId);
    console.log('aaaaaaaaabb');
    // console.log('body' , req.body);
    ProductModel.findOneAndUpdate({_id : req.body.productId},
    {
        $set:{
            deleted : true
        }
    },(err,data)=>{
        if (err) 
            return res.status(401).json({
                'error':err
            });
        else{
            if(data){
                return res.status(200).json({
                    message : "Delete product succesfully"
                });
            }
            else{
                return res.status(406).json({
                    message : "Not existed product | Error happens while deleting"
                })
            }
        }
    })
};


const getProductData =(req,res) =>{
    ProductModel.findOne({
        _id : req.body.productId
    }).then(data =>{
        return res.status(200).json({
            dataProduct : data
        })
    }).catch(err =>{
        console.log(error);
        return res.status(500).json({
            message: "Error",
        });
    })
}

const getListProductsByCategory = (req,res) =>{
    let restrictedFields ={
        deleted : false
    }
    ProductModel.find({
        category : req.body.category,
        deleted : false
    },restrictedFields).then(listProducts =>{
        return res.status(200).json({
            listProducts : listProducts
        })
    }).catch(err => {
        console.log(error);
        return res.status(500).json({
            message: "Error",
        });
    })
}


module.exports = {
    getAllActiveProducts,
    getListProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductData
}





