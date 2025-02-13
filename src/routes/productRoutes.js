const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * /products/update/{codice}:
 *   put:
 *     summary: Update a product
 *     tags: [Product Update]
 *     parameters:
 *       - in: path
 *         name: codice
 *         required: true
 *         schema:
 *           type: string
 *         description: Codice the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - material
 *               - color
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               material:
 *                 type: string
 *               color:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

router.put('/products/update/:codice', productController.updateProduct);

module.exports = router;