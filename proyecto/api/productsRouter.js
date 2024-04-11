const express = require('express');
const ProductManager = require('/proyecto/productManager');
const fs = require('fs');

const router = express.Router();
const productManager = new ProductManager('/proyecto/productManager');

// GET /api/products/
router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

// GET /api/products/:pid
router.get('/:pid', (req, res) => {
    const productId = req.params.pid;
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// POST /api/products/
router.post('/', (req, res) => {
    const newProduct = req.body;
    const productId = productManager.addProduct(newProduct);
    res.json({ id: productId });
});

// PUT /api/products/:pid
router.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    const success = productManager.updateProduct(productId, updatedProduct);
    if (success) {
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
    const productId = req.params.pid;
    const success = productManager.deleteProduct(productId);
    if (success) {
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;

