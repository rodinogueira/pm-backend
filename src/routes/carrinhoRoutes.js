const express = require("express");
const router = express.Router();
const carrinhoController = require("../controllers/carrinhoController");
const { validaId, validaCarrinho } = require("../middlewares/validacaoMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Rotas do carrinho
router.get("/:id", authMiddleware, validaId, carrinhoController.getCarrinhoById);
router.post("/", authMiddleware, carrinhoController.createCarrinho);
// router.put("/:id", authMiddleware, validaId, carrinhoController.updateCarrinho);
router.put("/:id", authMiddleware, carrinhoController.updateCarrinho);
router.delete("/:id", authMiddleware, validaId, carrinhoController.deleteCarrinho);
router.get("/", authMiddleware, carrinhoController.getAllCarrinhos);

module.exports = router;
