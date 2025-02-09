const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    token: { type: String },
    // images: { type: mongoose.Schema.Types.Mixed },
    images: { type: String, required: true },
    address: [
      {
        rua: { type: String, required: true },
        numero: { type: Number, required: true },
        complemento: { type: String },
        CEP: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    products_fav: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    admin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, // Adiciona automaticamente createdAt e updatedAt.
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
