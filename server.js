/**
 * This will be starting file of project
 */

const express = require("express")
const mongoose = require("mongoose")
const app=express()
const server_config = require("./configs/server.configs")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcrypt")

app.use(express.json())   //middleware, JSON->JS Object

/**
 * Create an admin user at the starting of the application
 * if not already present
 */
// Connection with mongodb

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error while connecting")
})

db.once("open", ()=>{
    console.log("Connected to MongoDB")
    init()
});

async function init(){
    try{
    let user = await user_model.findOne({userId : "admin"})

    if(user){
        console.log("Admin is already present")
        return
     }

    // if admin is not present we will try to create admin using try catch

    try{
        user = await user_model.create({
            name : "Himanshu",
            userId : "admin",
            email : "himanshu@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("Welcome1", 8) // hashSync find hash in sunchronous way
        })
        console.log("Admin Created, ", user)
    }
    catch(err)
    {
        console.log("Error while creating the admin ", err)
    }
    }
    catch(err)
    {
        console.log("Error while reading the data ", err)
    }
   
}

/**
 * Stich the route to the server
 */

require("./routes/auth.route")(app)
require("./routes/category.route")(app)
require("./routes/product.route")(app)
/**
 * Lets start the server
 */

app.listen(8888, ()=>{
    console.log("Server Started at port num : ", server_config.PORT)
})