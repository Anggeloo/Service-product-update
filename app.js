const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3002; 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Update Service",
      version: "1.0.0",
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger-product-update', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocs);
});

app.use('/', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger on http://localhost:${PORT}/swagger-product-update`);
  console.log(`Swagger JSON on http://localhost:${PORT}/swagger.json`);
});
