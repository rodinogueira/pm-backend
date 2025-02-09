const User = require("../models/userModel");
const userService = require("../services/userService");
const { generateToken, checkPassword, hashPassword } = require("../services/authService");

// Lista todos os usuários
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.findAllUsersService();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Busca usuário por ID
const getUserById = async (req, res) => {
    try {
        const user = await userService.findUserByIdService(req.params.id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cria um novo usuário
const createUser = async (req, res) => {
    try {
        const { name, email, password, images } = req.body;
        const hashedPassword = await hashPassword(password);

        const newUser = await userService.createUserService({
            name,
            email,
            password: hashedPassword,
            images,
        });

        const token = generateToken(newUser._id);
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Atualiza usuário por ID
const updateUser = async (req, res) => {
    try {
        const updatedData = req.body;
        if (updatedData.password) {
            updatedData.password = await hashPassword(updatedData.password);
        }

        const updatedUser = await userService.updateUserService(req.params.id, updatedData);
        if (!updatedUser) return res.status(404).json({ error: "Usuário não encontrado" });

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deleta usuário por ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUserService(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: "Usuário não encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login do usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Senha inválida" });

    const token = generateToken(user._id);
    res.json({ user, token });
};

// Adiciona um endereço ao usuário
const addUserAddress = async (req, res) => {
    try {
        const { rua, numero, complemento, CEP } = req.body;
        const user = await userService.addUserAddressService(req.params.id, {
            rua,
            numero,
            complemento,
            CEP,
        });

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove um endereço do usuário
const removeUserAddress = async (req, res) => {
    try {
        const { addressId } = req.body;
        const user = await userService.removeUserAddressService(req.params.id, addressId);

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Adiciona um produto aos favoritos do usuário
const addUserFavProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await userService.addUserFavProductService(req.params.id, req.body);

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove um produto dos favoritos do usuário
const removeUserFavProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await userService.removeUserFavProductService(req.params.id, productId);

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { 
    getUserById, 
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser, 
    loginUser,
    addUserAddress,
    removeUserAddress,
    addUserFavProduct,
    removeUserFavProduct,
};
