const Carrinho = require("../models/Carrinho");

// Função para encontrar um carrinho pelo ID
const findCarrinhoByIdService = async (id) => {
  return Carrinho.findById(id);
};

// Função para criar um novo carrinho
const createCarrinhoService = async (body) => {
  return Carrinho.create(body);
};

// Função para atualizar o carrinho (adicionar ou modificar produtos, atualizar frete ou preço total)
const updateCarrinhoService = async (id, body) => {
  return Carrinho.findByIdAndUpdate(id, body, { returnDocument: "after" });
};

// Função para remover um carrinho pelo ID
const deleteCarrinhoService = async (id) => {
  return Carrinho.findByIdAndDelete(id);
};

// Função para listar todos os carrinhos (opcional, dependendo do uso)
const findAllCarrinhosService = async () => {
  return Carrinho.find();
};

module.exports = {
  findCarrinhoByIdService,
  createCarrinhoService,
  updateCarrinhoService,
  deleteCarrinhoService,
  findAllCarrinhosService
};
