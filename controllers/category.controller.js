const category_model = require("../models/category.model")
// Controller for creating the category

exports.createNewCategory = async (req, res)=>{
    //Read the request body
    //Create the category object
    const cat_data = {
        name : req.body.name,
        description : req.body.description
    }
    try{
        //insert into MongoDB
        const category = await category_model.create(cat_data)
        return res.status(200).send(category)
    }
    catch(err){
        console.log("Error while creating the category", err)
        return res.status(500).send({
            message : "Error while creating the category."
        })
    }

    //return the response of the created category
}

//Controller for fetching the categories

exports.fetchCategories = async (req, res) =>{
    const category = await category_model.find();
    res.status(201).send(
        category
    )
}

//Controller for updating the categories

exports.updateCategories = async (req, res) =>{
    const body = req.body
    const filter = {name : body.name}
    const update = {
        name : body.updatedName,
        dascription : body.updatedDescription
    }
    try{
        // Updating in MongoDB
        const updation = await category_model.updateMany(filter, update)
        res.status(200).send({
            message : "Category updated successfully..."
        })
    }
    catch(err){
        console.log("Error while updating the category", err)
        res.status(500).send({
            message:"Error while updating the category"
        })
    }
}

//Controller for deleting the category

exports.deleteCategories = async (req, res) =>{
    const filter = {name : req.body.name}

    try{
        //Deleting the category
        const deletion = await category_model.deleteOne(filter)
        res.status(201).send({
            message : "Category has been deleted successfully..."
        })
    }
    catch(err){
        console.log("Error while deleting the category", err)
        res.status(500).send({
            message : "Error while deleting the category"
        })
    }
}