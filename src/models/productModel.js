const db = require('../db/db');

const updateProdut = async (codice, product) => {
    const { name, description, category, material, color, price } = product;

    if (!name && !description && !category && !material && !color && !price) {
        return res.status(400).json(ApiResponse('error', null, 'Debe proporcionar al menos un campo para actualizar.'));
    }

    const query = `
        UPDATE product
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
        codice,
        name,
        description,
        category,
        material,
        color,
        price,
    ];

    const result = await db.query(query, params); 
    return result.rows[0];

};

module.exports = { updateProdut };