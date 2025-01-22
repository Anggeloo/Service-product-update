const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db/db');
const ApiResponse = require('./models/ApiResponse');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.put('/products/:codigo_producto', async (req, res) => {
  const { codigo_producto } = req.params; 
  const { nombre, descripcion, categoria, material, color, precio } = req.body;

  if (!nombre && !descripcion && !categoria && !material && !color && !precio ) {
    return res.status(400).json(ApiResponse('error', null, 'Debe proporcionar al menos un campo para actualizar.'));
  }

  try {
    const query = `
      UPDATE productos
      SET 
        nombre = COALESCE($2, nombre),
        descripcion = COALESCE($3, descripcion),
        categoria = COALESCE($4, categoria),
        material = COALESCE($5, material),
        color = COALESCE($6, color),
        precio = COALESCE($7, precio),
        fecha_actualizacion = CURRENT_TIMESTAMP
      WHERE codigo_producto = $1
      RETURNING *;
    `;
    
    const params = [
      codigo_producto, 
      nombre, 
      descripcion, 
      categoria, 
      material, 
      color, 
      precio, 
    ];

    const result = await pool.query(query, params);

    if (result.rowCount === 0) {
      return res.status(404).json(ApiResponse('error', null, 'Producto no encontrado.'));
    }
    res.json(ApiResponse('success', result.rows[0], 'Producto actualizado exitosamente.'));
  } catch (err) {
    console.log(err);
    res.status(500).json(ApiResponse('error', null, 'Error al actualizar el producto.'));
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
