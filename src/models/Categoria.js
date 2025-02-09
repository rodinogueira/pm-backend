const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, unique: true },
  }
);

const Categoria = mongoose.model("categorias", CategoriaSchema);

module.exports = Categoria;
