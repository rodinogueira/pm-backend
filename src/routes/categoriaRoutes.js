const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const categoriaController = require("../controllers/categoriaController");
const { validaId, validaCategoria } = require("../middlewares/validacaoMiddleware");

const router = express.Router();

// Rota para criar uma nova categoria
router.post("/", authMiddleware, validaCategoria, categoriaController.createCategoria);

// Rota para obter todas as categorias
router.get("/", authMiddleware, categoriaController.getAllCategorias);

// Rota para obter uma categoria por ID
router.get("/:id", authMiddleware, validaId, categoriaController.getCategoriaById);

// Rota para atualizar uma categoria
router.put("/:id", authMiddleware, validaId, categoriaController.updateCategoria);

// Rota para excluir uma categoria
router.delete("/:id", authMiddleware, validaId, categoriaController.deleteCategoria);

module.exports = router;
