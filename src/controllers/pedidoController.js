const PedidoService = require("../services/pedidoService");
const { sendOrderConfirmationEmail } = require("../services/emailService");

// Controlador para obter um pedido pelo ID
const getPedidoByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await PedidoService.findPedidoByIdService(id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para criar um novo pedido
const createPedidoController = async (req, res) => {

  const order = { userEmail, frete, precoTotal, address } = req.body;
  
  try {
    const pedido = await PedidoService.createPedidoService(req.body);
    await sendOrderConfirmationEmail(userEmail, order, pedido);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para atualizar um pedido
const updatePedidoController = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await PedidoService.updateStatusPedidoService(id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para remover um pedido
const deletePedidoController = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await PedidoService.deletePedidoService(id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }
    res.status(200).json({ message: "Pedido removido com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para listar todos os pedidos
const getAllPedidosController = async (req, res) => {
  try {
    const pedidos = await PedidoService.findAllPedidosService();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPedidoByIdController,
  createPedidoController,
  updatePedidoController,
  deletePedidoController,
  getAllPedidosController,
};
