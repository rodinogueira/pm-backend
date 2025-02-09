const CarrinhoService = require("../services/carrinhoServices");

// Controlador para encontrar um carrinho pelo ID
const getCarrinhoById = async (req, res) => {
  console.log(req.params.id);
  try {
    const carrinho = await CarrinhoService.findCarrinhoByIdService(req.params.id);
    if (!carrinho) {
      return res.status(404).json({ message: "Carrinho não encontrado" });
    }
    // res.status(200).send(carrinho);
    res.json(carrinho);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para atualizar um carrinho pelo ID
const updateCarrinho = async (req, res) => {
  console.log(`updateCarrinho: >> ${req.body}`);
  console.log(`updateCarrinho id: >>${req.params.id}`);
  try {
    const carrinhoAtualizado = await CarrinhoService.updateCarrinhoService(req.params.id, req.body);
    if (!carrinhoAtualizado) {
      return res.status(404).json({ message: "Carrinho não encontrado" });
    }
    res.json(carrinhoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para remover um carrinho pelo ID
const deleteCarrinho = async (req, res) => {
  try {
    const carrinhoDeletado = await CarrinhoService.deleteCarrinhoService(req.params.id);
    if (!carrinhoDeletado) {
      return res.status(404).json({ message: "Carrinho não encontrado" });
    }
    res.json({ message: "Carrinho removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCarrinho = async (req, res) => {
console.log(req.body);
  try {
    const corpo = {
      produtos: req.body.produtos || [], // Se vazio, define como array vazio
      precoTotal: req.body.precoTotal || 0,
      quantidade: req.body.quantidade || 0,
      frete: req.body.frete || 0,
      userId: req.userId, // Usando o userId da requisição
      createdAt: new Date(),
    };

    // Chamando o serviço para criar o carrinho
    const carrinho = await CarrinhoService.createCarrinhoService(corpo);

    res.status(201).json(carrinho); // Retorna o carrinho criado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna o erro em caso de falha
  }
};



// Controlador para listar todos os carrinhos
const getAllCarrinhos = async (req, res) => {
  try {
    const carrinhos = await CarrinhoService.findAllCarrinhosService();
    res.json(carrinhos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCarrinhoById,
  createCarrinho,
  updateCarrinho,
  deleteCarrinho,
  getAllCarrinhos,
};
