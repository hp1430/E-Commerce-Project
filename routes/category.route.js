/**
 * POST localhost:8888/ecomm/api/v1/categories
 */

const category_controller = require("../controllers/category.controller")
const authMw = require("../middlewares/auth.mw")
//auth_mw = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/categories", [authMw.verifyToken, authMw.isAdmin] , category_controller.createNewCategory)
}


/**
 * POST localhost:8888/ecomm/api/v1/categories/fetch
 */

module.exports = (app) =>{
    app.get("/ecomm/api/v1/categories/fetch", [authMw.verifyToken], category_controller.fetchCategories)
}

/**
 * POST localhost:8888/ecomm/api/v1/categories/update
 */

module.exports = (app) =>{
    app.put("/ecomm/api/v1/categories/update", [authMw.verifyToken, authMw.isAdmin] , category_controller.updateCategories)
}

/**
 * POST localhost:8888/ecomm/api/v1/categories/delete
 */

module.exports = (app) =>{
    app.delete("/ecomm/api/v1/categories/delete",[authMw.verifyToken, authMw.isAdmin] , category_controller.deleteCategories)
}