const mongoose = require("mongoose");

const carrinhoSchema = new mongoose.Schema(
  {
    produtos: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
        quantidade: { type: Number, required: true, min: 1 }
      }
    ],
    createdAt: {
      type: Date,
      required: true,
      default: Date.now // Define a data de criação automaticamente
    },
    precoTotal: {
      type: Number,
      required: true,
      default: 0, // Inicializa o preço total com zero
      min: 0
    },
    frete: {
      type: Number,
      required: true,
      default: 0, // Inicializa o frete com zero
      min: 0
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refere-se ao schema de usuários
      required: true
    }
  },
  {
    timestamps: true // Adiciona automaticamente `createdAt` e `updatedAt`
  }
);

const Carrinho = mongoose.model("carrinhos", carrinhoSchema);

module.exports = Carrinho;
