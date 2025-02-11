const productService = require("../services/productService");
const mongoose = require("mongoose");
const getProductsByOwner = async (req, res) => {
    try {
        const ownerId = req.params.ownerId;
        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const products = await productService.findProductsByOwnerService(ownerId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Lista todos os produtos
// const getAllProducts = async (req, res) => {
//     try {
//         const products = await productService.findAllProductsService(req.query.limit, req.query.offset);
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const getAllProducts = async (req, res) => {
    try {
        // Captura page e limit da query string
        let { page, limit } = req.query;
        const pageToParse = JSON.parse(JSON.stringify(page));
        
        // Acessando a propriedade correta
        page = Number(pageToParse.page) || 1;
        limit = Number(limit) || 9; // Limite padrão 9

        // Calcula o offset
        const offset = (page - 1) * limit;

        console.log(`Page: ${page}, Limit: ${limit}, Offset: ${offset}`);

        // Obtém os produtos com base no limite e offset
        const products = await productService.findAllProductsService(limit, offset);
        const totalProducts = await productService.countTotalProducts();
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({
            products,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Busca um produto por ID
const getProductById = async (req, res) => {
    try {
        const product = await productService.findProductByIdService(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body
        };
        const newProduct = await productService.createProductService(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Atualiza um produto por ID
const updateProduct = async (req, res) => {
    try {
        const updatedData = req.body;
        const updatedProduct = await productService.updateProductService(req.params.id, updatedData);
        if (!updatedProduct) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deleta um produto por ID
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productService.deleteProductService(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

    const addCategoriaProductController = async (req, res) => {
        try {
            req.body.createdAt = new Date();
            const categoria = await productService.addCategoriaProductService(req.params.id, req.body)
            res.status(200).send(categoria);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    const removeCategoriaProductController = async (req, res) => {
        try {
            req.body.createdAt = new Date();
            const categoria = await productService.removeCategoriaProductService(req.body)
            res.status(200).send(categoria);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    addCategoriaProductController,
    removeCategoriaProductController,
    getProductsByOwner,
};
