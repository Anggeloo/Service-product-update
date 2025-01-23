const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db/db');
const ApiResponse = require('./models/ApiResponse');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.put('/products/:product_code', async (req, res) => {
  const { product_code } = req.params; 
  const { name, description, category, material, color, price } = req.body;

  if (!name && !description && !category && !material && !color && !price) {
    return res.status(400).json(ApiResponse('error', null, 'You must provide at least one field to update.'));
  }

  try {
    const query = `
      UPDATE products
      SET 
        name = COALESCE($2, name),
        description = COALESCE($3, description),
        category = COALESCE($4, category),
        material = COALESCE($5, material),
        color = COALESCE($6, color),
        price = COALESCE($7, price),
        updated_at = CURRENT_TIMESTAMP
      WHERE product_code = $1
      RETURNING *;
    `;
    
    const params = [
      product_code, 
      name, 
      description, 
      category, 
      material, 
      color, 
      price, 
    ];

    const result = await pool.query(query, params);

    if (result.rowCount === 0) {
      return res.status(404).json(ApiResponse('error', null, 'Product not found.'));
    }
    res.json(ApiResponse('success', result.rows[0], 'Product updated successfully.'));
  } catch (err) {
    console.log(err);
    res.status(500).json(ApiResponse('error', null, 'Error updating the product.'));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
