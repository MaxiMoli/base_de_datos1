const express = require('express');
const fs = require('fs');
const router = express.Router();

const carritoPath = './data/carrito.json';

// POST /api/carts/
router.post('/', (req, res) => {
    // Implementar la lógica para crear un nuevo carrito
});

// GET /api/carts/:cid
router.get('/:cid', (req, res) => {
    // Implementar la lógica para obtener los productos de un carrito
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
    // Implementar la lógica para agregar un producto a un carrito
});

module.exports = router;


