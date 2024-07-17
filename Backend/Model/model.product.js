const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
}, {
    versionKey: false
});

const ProductModel = mongoose.model('Product', productSchema); // 'Product' is the model name

module.exports = ProductModel;