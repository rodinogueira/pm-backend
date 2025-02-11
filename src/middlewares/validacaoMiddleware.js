const ObjectId = require("mongoose").Types.ObjectId;

const validaUsuario = (req, res, next) => {
    if(!req.body.name){
        return res.status(400).send({ message: "O campo 'name' precisa ser preenchido"})
    }
    if(!req.body.email){
        return res.status(400).send({ message: "O campo 'email' precisa ser preenchido"})
    }
    if(!req.body.password){
        return res.status(400).send({ message: "O campo 'password' precisa ser preenchido"})
    }
    if(!req.body.images){
        return res.status(400).send({ message: "O campo 'images' precisa ser preenchido"})
    }
    if(!req.body.admin){
        return res.status(400).send({ message: "O campo 'admin' precisa ser preenchido"})
    }

    next();
}

const validaEndereco = (req, res, next) => {
    let erros = [];

    req.body.map((value, key) => {
        if(!value.rua) {
            erros.push(`'${key+1} - rua'`)
        }
        if(!value.numero) {
            erros.push(`'${key+1} - numero'`)
        }
        if(!value.CEP) {
            erros.push(`'${key+1} - CEP'`)
        }
    });

    if(erros.length == 0){
        return next();
    } else {
        if(erros.length > 1) {
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`})
        }else {
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchidos!`})
        }
    }
}

const validaProduto = (req, res, next) => {
    let erros = [];

    if(!req.body.nome) {
        erros.push("nome")
    }
    if(!req.body.descricao) {
        erros.push("descricao")
    }
    if(!req.body.precoUnitario) {
        erros.push("precoUnitario")
    }
    if(!req.body.imagem) {
        erros.push("imagem")
    }
    if(!req.body.codigoBarra) {
        erros.push("codigoBarra")
    }

    if(erros.length === 0) {
        return next();
    } else {
        if(erros.length > 1) {
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`}) 
        }else {
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`}) 

        }
    }
}

const validaCategoria = (req, res, next) => {
    if(!req.body.nome){
        return res.status(400).send({ message: "O campo 'nome' precisa ser preenchido"})
    }

    next();
}

const validaPedido = (req, res, next) => {
    let erros = [];

    if(!req.body.precoTotal) {
        erros.push("precoTotal")
    }
    if(!req.body.frete) {
        erros.push("frete")
    }
    if(!req.body.concluido) {
        erros.push("concluido")
    }

    if(erros.length == 0) {
        return next();
    } else {
        if(erros.length > 1) {
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`}) 
        }else {
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`}) 

        }
    }
}

const validaCarrinho = (req, res, next) => {
    let erros = [];

    // if(!req.body.precoTotal) {
    //     erros.push("precoTotal")
    // }
    // if(!req.body.frete) {
    //     erros.push("frete")
    // }

    if(erros.length == 0) {
        return next();
    } else {
        if(erros.length > 1) {
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`}) 
        }else {
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`})
        }
    }
}

const validaId = (req, res, next) => {
    if(ObjectId.isValid(req.params.id)) {
        return next();
    } else {
        return res.status(400).send({message: `O ID não correponde aos padroes necessarios!`})
    }
}

const validaLogin = (req, res, next) => {
    let erros = [];

    if(!req.body.email) {
        erros.push("email")
    }

    if(!req.body.password) {
        erros.push("password")
    }

    if(erros.length() == 0) {
        return next();
    } else {
        if(erros.length > 1) {
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`}) 
        }else {
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`})
        }
    }
}

module.exports = {
    validaUsuario,
    validaEndereco,
    validaProduto,
    validaCategoria,
    validaPedido,
    validaCarrinho,
    validaId,
    validaLogin
}