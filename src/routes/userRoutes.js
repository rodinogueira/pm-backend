const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { validaUsuario, validaEndereco, validaId, validaLogin } = require("../middlewares/validacaoMiddleware");

router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, validaId, userController.getUserById);
router.post("/", validaUsuario, userController.createUser);
router.put("/:id", authMiddleware, validaId, validaUsuario, userController.updateUser);
router.delete("/:id", authMiddleware, validaId, userController.deleteUser);
router.post("/login", userController.loginUser);

// Rotas de endereços do usuário
router.post("/address/:id", authMiddleware, validaId, validaEndereco, userController.addUserAddress);
router.delete("/address/:id", authMiddleware, validaId, userController.removeUserAddress);

// Rotas de produtos favoritos do usuário
router.post("/favorites/:id", authMiddleware, userController.addUserFavProduct);
router.delete("/favorites/:id", authMiddleware, validaId, userController.removeUserFavProduct);


module.exports = router;
