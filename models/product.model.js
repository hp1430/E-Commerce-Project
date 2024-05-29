const mongoose = require("mongoose")
const category_model = require("../models/category.model")

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }, // Reference to Category

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        default: 0
    },

   // images: [String],

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },
  }, {timestamps : true, versionKey : false});

  module.exports = mongoose.model("Product", productSchema)