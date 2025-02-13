const productModel = require('../models/productModel');

exports.updateProduct = async (codice,product) => {
    return await productModel.updateProdut(codice,product);
};