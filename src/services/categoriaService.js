const Categoria = require("../models/Categoria");

// Função para criar uma nova categoria
const createCategoria = async (nome) => {
  // console.log(nome, 'categoriaService')
  try {
    const categoria = new Categoria({ nome });
    await categoria.save();
    return categoria;
  } catch (error) {
    throw new Error(`Erro ao criar categoria: ${error.message}`);
  }
};

// Função para obter todas as categorias
const getAllCategorias = async () => {
  try {
    return await Categoria.find();
  } catch (error) {
    throw new Error(`Erro ao obter categorias: ${error.message}`);
  }
};

// Função para obter uma categoria por ID
const getCategoriaById = async (id) => {
  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria;
  } catch (error) {
    throw new Error(`Erro ao obter categoria: ${error.message}`);
  }
};

// Função para atualizar uma categoria
const updateCategoria = async (id, nome) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { nome },
      { new: true } // Retorna o documento atualizado
    );
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria;
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria: ${error.message}`);
  }
};

// Função para excluir uma categoria
const deleteCategoria = async (id) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria;
  } catch (error) {
    throw new Error(`Erro ao excluir categoria: ${error.message}`);
  }
};

module.exports = {
  createCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria,
};
