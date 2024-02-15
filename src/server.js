const express = require("express");
const connection = require("./database/connection");
const userRoutes = require("./routes/userRoutes"); // Importa as rotas de usuário
const psychologistRoutes = require("./routes/psychologistRoutes"); // Importa as rotas de pscicologo
const moderatorRoutes = require("./routes/moderatorRoutes"); // Importa as rotas de moderador
const adminRoutes = require("./routes/adminRoutes"); // Importa as rotas de administrador
const authRoutes = require("./routes/authRoutes"); // Importa as rotas de autenticação
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Associa as rotas de usuário ao caminho '/users'
app.use("/user", userRoutes);
app.use("/psychologist", psychologistRoutes);
app.use("/moderator", moderatorRoutes);
app.use("/admin", adminRoutes);
app.use("/login", authRoutes);

// Verifica a conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
