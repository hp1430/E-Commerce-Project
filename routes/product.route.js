const product_controller = require("../controllers/product.controller")
const authMW = require("../middlewares/auth.mw")

/**
 * POST localhost:8888/ecomm/api/v1/products/create
 */
module.exports = (app)=>{
    app.post("/ecomm/api/v1/products/create", [authMW.verifyToken, authMW.isAdmin], product_controller.createProduct)
}

/**
 * GET localhost:8888/ecomm/api/v1/products/fetch
 */
module.exports = (app)=>{
    app.get("/ecomm/api/v1/products/fetch", [authMW.verifyToken], product_controller.getAllProducts)
}

/**
 * PUT localhost:8888/ecomm/api/v1/products/update
 */
module.exports = (app)=>{
    app.put("/ecomm/api/v1/products/update", [authMW.verifyToken, authMW.isAdmin], product_controller.updateProduct)
}

/**
 * DELETE localhost:8888/ecomm/api/v1/products/delete
 */
module.exports = (app)=>{
    app.delete("/ecomm/api/v1/products/delete", [authMW.verifyToken, authMW.isAdmin], product_controller.deleteProduct)
}
