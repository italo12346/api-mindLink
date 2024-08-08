const express = require("express");
const connection = require("./database/connection");
const userRoutes = require("./routes/userRoutes"); // Importa as rotas de usuário
const psychologistRoutes = require("./routes/psychologistRoutes"); // Importa as rotas de pscicologo
const moderatorRoutes = require("./routes/moderatorRoutes"); // Importa as rotas de moderador
const adminRoutes = require("./routes/adminRoutes"); // Importa as rotas de administrador
const authRoutes = require("./routes/authRoutes"); // Importa as rotas de autenticação
const profileRoutes = require("./routes/profileRoutes"); // Importa as rotas de perfil
const postRoutes = require("./routes/postRoutes"); // Importa as rotas de posts
const commentRoutes = require("./routes/commentRoutes"); // Importa as rotas de posts
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/user", userRoutes);
app.use("/psychologist", psychologistRoutes);
app.use("/moderator", moderatorRoutes);
app.use("/admin", adminRoutes);
app.use("/login", authRoutes);
app.use("/profile", profileRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

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
