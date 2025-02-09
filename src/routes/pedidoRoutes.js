const express = require("express");
const PedidoController = require("../controllers/pedidoController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validaId, validaPedido } = require("../middlewares/validacaoMiddleware");

const router = express.Router();

// Rota para obter todos os pedidos
router.get("/", authMiddleware, PedidoController.getAllPedidosController);

// Rota para obter um pedido por ID
router.get("/:id", authMiddleware, validaId, PedidoController.getPedidoByIdController);

// Rota para criar um novo pedido
router.post("/", authMiddleware, validaPedido, PedidoController.createPedidoController);

// Rota para atualizar um pedido por ID
router.patch("/:id", authMiddleware, validaId, PedidoController.updatePedidoController);

// Rota para deletar um pedido por ID
router.delete("/:id", authMiddleware, validaId, PedidoController.deletePedidoController);

module.exports = router;
