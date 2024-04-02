const mongoose=require('mongoose')

/**
 * name
 * Id
 * password
 * email
 * User Type
 */

const userSchema= new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String, 
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    userType : {
        type : String,
        required : true,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"]
    }
},{timestamps : true, versionKey : false})

module.exports = mongoose.model("User", userSchema)
// with userSchema, a model is being created with name "User", now using 
// this model we can create, update, delete, read as many models as we want...