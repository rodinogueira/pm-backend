const categoriaService = require("../services/categoriaService");

// Controller para criar uma nova categoria
const createCategoria = async (req, res) => {
  const { nome } = req.body;
  try {
    const categoria = await categoriaService.createCategoria(nome);
    res.status(201).json(categoria); // Resposta de sucesso (201 Created)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Resposta de erro (400 Bad Request)
  }
};

// Controller para obter todas as categorias
const getAllCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.status(200).json(categorias); // Resposta de sucesso (200 OK)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Resposta de erro (400 Bad Request)
  }
};

// Controller para obter uma categoria por ID
const getCategoriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaService.getCategoriaById(id);
    res.status(200).json(categoria); // Resposta de sucesso (200 OK)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Resposta de erro (400 Bad Request)
  }
};

// Controller para atualizar uma categoria
const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const categoria = await categoriaService.updateCategoria(id, nome);
    res.status(200).json(categoria); // Resposta de sucesso (200 OK)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Resposta de erro (400 Bad Request)
  }
};

// Controller para excluir uma categoria
const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaService.deleteCategoria(id);
    res.status(200).json({ message: "Categoria excluída com sucesso", categoria });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Resposta de erro (400 Bad Request)
  }
};

module.exports = {
  createCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria,
};
