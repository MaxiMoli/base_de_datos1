const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    addProduct(product) {
        let products = this.getProducts();
        const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        product.id = id;
        products.push(product);
        this.saveProducts(products);
        return id;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading file:', error);
            return [];
        }
    }

    getProductById(productId) {
        const products = this.getProducts();
        return products.find(product => product.id === productId);
    }

    updateProduct(productId, updatedFields) {
        let products = this.getProducts();
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            this.saveProducts(products);
            return true;
        }
        return false;
    }

    deleteProduct(productId) {
        let products = this.getProducts();
        products = products.filter(product => product.id !== productId);
        this.saveProducts(products);
    }

    saveProducts(products) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
            console.log('Products saved successfully.');
        } catch (error) {
            console.error('Error writing file:', error);
        }
    }
}

// Crear una instancia de ProductManager con la ruta del archivo
const productManager = new ProductManager('./data/productos.json');

// Agregar un producto
const newProductId = manager.addProduct({
    title: "Producto de ejemplo",
    description: "Esta es una descripción de ejemplo",
    price: 100,
    thumbnail: "path/to/image.jpg",
    code: "ABC123",
    stock: 10
});
console.log('Nuevo ID de producto:', newProductId);

// Obtener todos los productos
console.log(productManager.getProducts());

// Obtener un producto por su ID
console.log(productManager.getProductById(newProductId));

// Actualizar un producto
const updated = productManager.updateProduct(newProductId, { price: 150, stock: 15 });
console.log('Producto actualizado:', updated);
console.log(manager.getProducts());

// Eliminar un producto
/*productManager.deleteProduct(newProductId);
console.log('Producto eliminado');
console.log(manager.getProducts());*/

