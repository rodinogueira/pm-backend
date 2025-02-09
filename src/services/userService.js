const User = require("../models/userModel");

// Serviço para encontrar usuário por ID
const findUserByIdService = (id) => {
    return User.findById(id);
};

// Serviço para encontrar todos os usuários
const findAllUsersService = () => {
    return User.find();
};

// Serviço para criar um novo usuário
const createUserService = (userData) => {
    return User.create(userData);
};

// Serviço para atualizar usuário por ID
const updateUserService = (id, updatedData) => {
    return User.findByIdAndUpdate(id, updatedData, { new: true });
};

// Serviço para deletar usuário por ID
const deleteUserService = (id) => {
    return User.findByIdAndDelete(id);
};

// Serviço para adicionar endereço ao usuário
const addUserAddressService = async (userId, address) => {
    return User.findByIdAndUpdate(
        userId,
        { $push: { address } },
        { new: true }
    );
};

// Serviço para remover endereço do usuário
const removeUserAddressService = async (userId, addressId) => {
    return User.findByIdAndUpdate(
        userId,
        { $pull: { address: { _id: addressId } } },
        { new: true }
    );
};

// Serviço para adicionar produto aos favoritos do usuário
const addUserFavProductService = async (id, product) => {
    return User.findByIdAndUpdate(
        {
            _id: id
        },
        { 
            $push: { 
                products_fav: {
                    _id: product._id
                } 
            } 
        },
        {
            rawResult: true
        }
    );
};
// const addUserFavProductService = async (userId, product) => {
//     return User.findByIdAndUpdate(
//         userId,
//         { $addToSet: { products_fav: product } }, // $addToSet evita duplicatas
//         { new: true }
//     );
// };

// Serviço para remover produto dos favoritos do usuário
const removeUserFavProductService = async (id, produto) => {
    return User.findByIdAndUpdate(
        {
            _id: id
        },
        { 
            $pull: { 
                products_fav: {
                    _id: produto._id
                } 
            } 
        },
        {
            rawResult: true
        }
    );
};

// const removeUserFavProductService = async (userId, productId) => {
//     return User.findByIdAndUpdate(
//         userId,
//         { $pull: { products_fav: { _id: productId } } },
//         { new: true }
//     );
// };

module.exports = {
    findUserByIdService,
    findAllUsersService,
    createUserService,
    updateUserService,
    deleteUserService,
    addUserAddressService,
    removeUserAddressService,
    addUserFavProductService,
    removeUserFavProductService
};
