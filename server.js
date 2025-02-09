const express = require("express");
const connectDatabase = require("./src/utils/connectDatabase");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes"); // Importe as rotas de produtos
const categoriaRoutes = require("./src/routes/categoriaRoutes");
const carrinhoRoutes = require("./src/routes/carrinhoRoutes");
const pedidoRoutes = require("./src/routes/pedidoRoutes");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");

const app = express();
connectDatabase();

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

// Swagger setup
const swaggerDocument = require("./src/swagger/swagger.json");  // Caminho para o arquivo JSON

// Usando o Swagger UI para exibir o JSON gerado
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Defina a rota base para os usuários
app.use("/api/users", userRoutes);

// app.use("/api/auth", authRoutes);

// Adicione a rota base para os produtos
app.use("/api/products", productRoutes); // Adicione as rotas de produto

app.use("/api/categorias", categoriaRoutes);

app.use("/api/carrinhos", carrinhoRoutes);

// Adicione a rota base para pedidos
app.use("/api/pedidos", pedidoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
