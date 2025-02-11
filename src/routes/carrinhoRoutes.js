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
// Rota para remover um produto do carrinho
router.delete('/:carrinhoId/produto/:productId', authMiddleware, carrinhoController.removeProdutoDoCarrinho);

module.exports = router;
