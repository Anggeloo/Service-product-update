const ApiResponse = require('../models/ApiResponse');
const productService = require('../services/productService');

exports.updateProduct = async (req, res) => {
    try {
        const { codice } = req.params;
        const product = req.body;
        const result = await productService.updateProduct(codice,product);

        if (!result) {
            return res.status(404).json(ApiResponse('error', null, 'Product not found.'));
        }
        
        res.json(ApiResponse('success', result, 'Product updated successfully.'));

    } catch (err) {
        console.log(err);
        res.status(500).json(ApiResponse('error', null, 'Error updating product.'));
    }
};
