const AccountModel = require('../models/user');
const ProductModel = require('../models/product');
const OrderModel = require('../models/order');


const addToCart = async function(req,res,next) {
    const user = await AccountModel.findById(req.userId);
    const product = await ProductModel.findById(req.body.productId);
    // console.log(product);
    if (product.deleted == false) {
        if(parseInt(req.body.quantity) > product.quantity){
            res.status(401).json({
                'message': 'Exceed stock quantity'
            });
        }
        else{
            const isExisting = user.cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
            if (isExisting >= 0) {
                if(parseInt(req.body.quantity)+user.cart.items[isExisting].quantity > product.quantity){
                    res.status(401).json({
                        message: 'Total will exceed stock quantity'
                    });
                }
                else{
                    user.cart.items[isExisting].quantity = user.cart.items[isExisting].quantity + parseInt(req.body.quantity);
                }
            } else {
                user.cart.items.push({ productId: product._id, quantity: req.body.quantity });
            }
            user.save();
            res.status(201).json({
                message: 'Add To Cart Succesfully'
            })
        }
    }
    else{
        res.status(406).json({
            message: 'Not existed product'
        })
    }
};

const removeFromCart = async function(req,res,next) {
    const user = await AccountModel.findById(req.userId);
    const product = await ProductModel.findById(req.body.productId);
    if(product){
        const isExisting = user.cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
        if (isExisting >= 0) {
            user.cart.items.splice(isExisting, 1);
            user.save();
            res.status(200).json({
                message: 'Remove from cart succesfully'
            });
        }
        else {
            res.status(401).json({
                message: 'That product is not existed in cart'
            });
        }
    }
    else{
        res.status(406).json({
            message: 'Not existed product'
        });
    }
};

const updateCart = async function(req,res,next) {
    const user = await AccountModel.findById(req.userId);
    const product = await ProductModel.findById(req.body.productId);
    if(product){
        const isExisting = user.cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
        if (isExisting >= 0) {
            user.cart.items[isExisting].quantity = req.body.quantity;
            user.save();
            res.status(200).json({
                'message': 'Update quantity successfully'
            })
        }
        else {
            res.status(406).json({
                'message': 'That product is not existed in cart'
            });
        }
    }
    else{
        res.status(401).json({
            'message': 'Not existed product'
        });
    }
};

const discardFromCart = async function(req,res,next) {
    const user = await AccountModel.findById(req.userId);
    const product = await ProductModel.findById(req.body.productId);
    // console.log(product);
    if (product.deleted == false) {
        const isExisting = user.cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
        if (isExisting >= 0) {
            if(user.cart.items[isExisting].quantity-parseInt(req.body.quantity) > product.quantity){
                return res.status(401).json({
                    message: 'Exceed stock quantity'
                });
            }   
            if(user.cart.items[isExisting].quantity-parseInt(req.body.quantity) == 0){
                user.cart.items.splice(isExisting, 1);
                user.save();
                return res.status(200).json({
                    message: 'Remove product from cart'
                });
            }
            else{
                user.cart.items[isExisting].quantity = user.cart.items[isExisting].quantity - parseInt(req.body.quantity);
                user.save();
                return res.status(201).json({
                    message: 'Minus quantity succesfully'
                })
            }
        }
        else{
            res.status(406).json({
                message: 'Not existed product in cart'
            })
        }
    }
    else{
        res.status(406).json({
            message: 'Not existed product'
        })
    }
};

const showCart = async function(req,res,next) {
    let listProducts = [];
    let restrictedFields ={
        deleted : false,
        quantity : false,
        category: false
    }
    const user = await AccountModel.findById(req.userId);
    await Promise.all(user.cart.items.map(async(product)=>{
        try{
            let ProductInfor = await ProductModel.find({
                _id: product.productId
            },restrictedFields);
            listProducts.push({
                ProductInfor : ProductInfor,
                Quantity : product.quantity 
            });
        }catch(err){
            throw err;
        }
    }))
    return res.status(200).json({
        listProducts : listProducts
    })
};

module.exports = {
    addToCart,
    removeFromCart,
    updateCart,
    showCart,
    discardFromCart
};