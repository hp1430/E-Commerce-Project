const product_model = require("../models/product.model")
const category_model = require("../models/category.model")

exports.createProduct = async(req, res) => {
    // checking whether the category name is valid or not
   // const category = req.body.category
   let categoryId = null
    try{
        const categ = await category_model.findOne({name : req.body.category})
        if(!categ){
            return res.status(400).send({
                message : "Invalid Category mentioned !!!"
            })
        }
        categoryId = categ._id
    }
    catch(err){
        console.log("Error while validating the category id !!!", err)
        return res.status(500).send({
            message : "Error while validating the category !!!"
        })
    }

    const prod_data = {
        productId : req.body.productId,
        name : req.body.name,
        description : req.body.description,
        category : categoryId,
        price : req.body.price,
        stock : req.body.stock
    }

    try{
        // inserting into MongoDB
        const product = await product_model.create(prod_data)
        return res.status(200).send(product)
    }
    catch(err){
        console.log("Error while creating the product !!!", err)
        return res.status(500).send({
            message : "Error while creating the product !!!"
        })
    }
}

exports.getAllProducts = async(req, res)=>{
    try{
        const products = await product_model.find().populate('category')
        return res.status(200).send(products)
    }
    catch(err){
        console.log("Error while fetching the products !!!", err)
        return res.status(500).send({
            message : "Error while fetching the products !!!"
        })
    }
}

exports.updateProduct = async(req, res)=>{
    const isValid = await product_model.findOne({productId : req.body.productId})
    if(!isValid){
        return res.status(500).send({
            message : "No Product with entered Product Id exists !!!"
        })
    }
    const filter = {productId : req.body.productId}
    const update = {
        name : req.body.updatedName,
        category : req.body.updatedCategory,
        price : req.body.updatedPrice,
        description : req.body.updatedDescription,
        stock : req.body.updatedStock
    }

    // Updating in MongoDB
    try{
        const updation = await product_model.updateMany(filter, update)
        res.status(200).send({
            message : "Product Updated Successfully..."
        })
    }
    catch(err){
        console.log("Error while updating the product !!!", err)
        return res.status(500).send({
            message : "Error while updating the product !!!"
        })
    }
}

// Deleting the Product
exports.deleteProduct = async(req, res)=>{
    const filter = {productId : req.body.productId}
    try{
        const deletion = await product_model.deleteOne(filter)
        res.status(200).send({
            message : "Product has been deleted successfully..."
        })
    }
    catch(err){
        console.log("Error while deleting the category !!!", err)
        res.status(500).send({
            message : "Error while deleting the Product !!!"
        })
    }
}