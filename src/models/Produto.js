const mongoose = require("mongoose");

// Definindo o schema de categoria
const CategoriaSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "categorias", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  // { _id: false } // Impede a criação de um campo _id para o array de categorias
);

// Definindo o schema do produto
const ProdutoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    precoUnitario: { type: Number, required: true },
    imagem: { type: String, required: true },
    codigoBarra: { type: String, required: true },
    categoria: [CategoriaSchema], // Relacionamento com a categoria
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true } // Adiciona os campos createdAt e updatedAt automaticamente
);

// Criando o modelo de Produto
const Produto = mongoose.model("Produto", ProdutoSchema);

module.exports = Produto;
