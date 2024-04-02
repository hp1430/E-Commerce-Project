const { verify } = require("jsonwebtoken")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")
/**
 * Create a middleware that checks if the request body is proper and correct.
 */

const verifySignUpBody = async (req, res, next)=>{
    try{
        // Check for the name
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed! Name was not provided in request body"
            })
        }

        // Check for the email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed! Email was not provided in request body"
            })
        }
    
        // Check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed! userId was not provided in request body"
            })
        }
    
        // Check ifthe user with the same userId is already present.
        const user = await user_model.findOne({userId : req.body.userId})

        if(user){
            return res.status(400).send({
                message : "Failed! User with same user Id already exists"
            })
        }

        next()
    }
    catch(err)
    {
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message : "Error while Validating the request body"
        })
    }
}

const verifySignInBody = async (req, res, next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "UserId is not provided."
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "Password is not provided."
        })
    }
    next()
}

const verifyToken = (req, res, next)=>{
    //check if the token is present in the header(postman)
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message : "No token Found : Unauthorized"
        })
    }

    //check if it is the valid token
    jwt.verify(token, auth_config.secret, async (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "Unauthorized"
            })
        }
        const user = await user_model.findOne({userId : decoded.id})
        if(!user){
            return res.status(400).send({
                message : "Unauthorized, this user for this token doesn't exists"
            })
        }
        next()

        //set the user info in the req body
        req.user = user
    })
    
    //then move to the next step
}

const isAdmin =(req, res, next)=>{
    const user = req.user
    if(user && user.userType=="ADMIN"){
        next()
    }
    else{
        return res.status(403).send({
            message : "Only ADMIN users are allowed to access this endpoint"
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}
