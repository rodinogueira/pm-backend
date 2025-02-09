const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController"); // Certifique-se de que o caminho do controller está correto
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação
const paginacao = require("../middlewares/paginacaoMiddleware");
const { validaId, validaProduto } = require("../middlewares/validacaoMiddleware");

// Rota para listar todos os produtos (pode ser pública)
router.get("/", authMiddleware, paginacao, productController.getAllProducts);

// Rota para buscar um produto por ID (pode ser pública)
router.get("/:id", authMiddleware, validaId, productController.getProductById);

// Rota para criar um novo produto (requer autenticação)
router.post("/", authMiddleware, validaProduto, productController.createProduct);
router.post("/categoria/:id", authMiddleware, validaId, productController.addCategoriaProductController);

// Rota para atualizar um produto por ID (requer autenticação)
router.put("/:id", authMiddleware, validaId, validaProduto, productController.updateProduct);

// Rota para deletar um produto por ID (requer autenticação)
router.delete("/:id", authMiddleware, validaId, productController.deleteProduct);
router.delete("/categoria/:id", authMiddleware, validaId, productController.removeCategoriaProductController);

router.get("/owner/:ownerId", authMiddleware, productController.getProductsByOwner);

module.exports = router;
