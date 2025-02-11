const Produto = require("../models/Produto"); // Assumindo que o model Produto foi criado

const findProductsByOwnerService = (ownerId) => {
    return Produto.find({ owner: ownerId });
};

// Serviço para encontrar um produto por ID
const findProductByIdService = (id) => {
    return Produto.findById(id);
};

const findAllProductsService = (limit, offset) => {
    return Produto.find()
        .limit(limit) // Limita o número de produtos retornados
        .skip(offset); // Pula os produtos com base no offset
};

// Função para contar o número total de produtos
const countTotalProducts = () => {
    return Produto.countDocuments(); // Conta todos os produtos
};

// Serviço para criar um novo produto
const createProductService = (productData) => {
    return Produto.create(productData);
};

// Serviço para atualizar um produto por ID
const updateProductService = (id, updatedData) => {
    return Produto.findByIdAndUpdate(id, updatedData, { new: true });
};

// Serviço para deletar um produto por ID
const deleteProductService = (id) => {
    return Produto.findByIdAndDelete(id);
};

const addCategoriaProductService = (id, categoria) => {
    console.log(categoria, 'addCategoriaProductService')
    console.log(id, 'addCategoriaProductService')
    return Produto.findOneAndUpdate(
        {
            _id: id
        },
        {
            $push: {
                categoria: {
                    _id: id,
                    createdAt: categoria.createdAt
                }
            }
        },
        {
            rawResult: true,
        }
    )
}

const removeCategoriaProductService = (id, categoria) => {
    return Product.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull: {
                categoria: {
                    _id: categoria._id,
                }
            }
        },
        {
            rawResult: true,
        }
    )
}

module.exports = {
    findProductByIdService,
    findAllProductsService,
    createProductService,
    updateProductService,
    deleteProductService,
    addCategoriaProductService,
    removeCategoriaProductService,
    findProductsByOwnerService,
    countTotalProducts,
};
