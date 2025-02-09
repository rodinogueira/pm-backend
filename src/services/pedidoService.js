const Pedido = require("../models/Pedido");

// Função para encontrar um pedido pelo ID
const findPedidoByIdService = async (id) => {
  return Pedido.findById(id);
};

// Função para criar um novo pedido
const createPedidoService = async (body) => {
  return Pedido.create(body);
};

// Função para atualizar um pedido (modificar status, atualizar itens, etc.)
const updateStatusPedidoService = async (id) => {
  return Pedido.findByIdAndUpdate({_id: id,}, { $set: { concluido: true } });
};

// Função para remover um pedido pelo ID
const deletePedidoService = async (id) => {
  return Pedido.findByIdAndDelete(id);
};

// Função para listar todos os pedidos (opcional, dependendo do uso)
const findAllPedidosService = async () => {
  return Pedido.find();
};

module.exports = {
  findPedidoByIdService,
  createPedidoService,
  updateStatusPedidoService,
  deletePedidoService,
  findAllPedidosService,
};
