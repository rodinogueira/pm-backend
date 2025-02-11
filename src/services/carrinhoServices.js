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

const removeProdutoDoCarrinhoService = async (idCarrinho, idProduto) => {
  // Encontrar o carrinho pelo ID
  const carrinho = await Carrinho.findById(idCarrinho);
  if (!carrinho) {
    return null; // Carrinho não encontrado
  }

  // Filtra o array de produtos para remover o produto com o ID fornecido
  const produtosFiltrados = carrinho.produtos.filter(produto => 
    produto._id.toString() !== idProduto // Certifique-se de que está comparando com a string
  );

  // Se o produto não for encontrado, retorna o carrinho sem modificações
  if (produtosFiltrados.length === carrinho.produtos.length) {
    return carrinho; // Nenhum produto foi removido
  }

  // Atualiza a lista de produtos do carrinho
  carrinho.produtos = produtosFiltrados;

  // Recalcula o preço total do carrinho
  carrinho.precoTotal = carrinho.produtos.reduce((total, produto) => total + (produto.preco || 0), 0);

  // Atualiza a quantidade de produtos no carrinho
  carrinho.quantidade = carrinho.produtos.length;

  // Salva o carrinho atualizado no banco de dados
  await carrinho.save();

  return carrinho; // Retorna o carrinho atualizado
};

module.exports = {
  findCarrinhoByIdService,
  createCarrinhoService,
  updateCarrinhoService,
  deleteCarrinhoService,
  findAllCarrinhosService,
  removeProdutoDoCarrinhoService,
};
