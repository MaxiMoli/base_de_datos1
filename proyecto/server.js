const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./api/productsRouter');
const cartsRouter = require('./api/cartsRouter');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
