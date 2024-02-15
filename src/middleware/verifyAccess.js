const Admin = require("../model/Admin");
const Psychologist = require("../model/Psychologist");
const Moderator = require("../model/Moderator");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  // Verifica se o cabeçalho 'Authorization' está presente na requisição
  const bearer = req.headers.authorization;
  const token = bearer.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido" });
  }

  try {
    // Decodifica o token JWT para obter informações do usuário
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o usuário existe com base no ID fornecido pelo token
    let user;
    switch (decoded.role) {
      case "admin":
        user = await Admin.findByPk(decoded.id);
        break;
      case "psychologist":
        user = await Psychologist.findByPk(decoded.id);
        break;
      case "moderator":
        user = await Moderator.findByPk(decoded.id);
        break;
      case "user":
        user = await User.findByPk(decoded.id);
        break;
      default:
        throw new Error("Tipo de usuário inválido");
    }

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // Adiciona as informações do usuário ao objeto 'req' para uso posterior nas rotas
    req.user = user;
    req.user.id = decoded.id;
    req.user.role = decoded.role;
    next(); // Permite que a solicitação continue para a próxima rota ou middleware
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token de autenticação inválido" });
  }
}
async function verifyPermissions(req, res, next) {
  // Verifica se o usuário tem permissão para acessar a rota
  const { role } = req.user;
  if (role !== "admin" && role !== "moderator") {
    return res
      .status(403)
      .json({ message: "Usuário não tem permissão para acessar esta rota" });
  }
  next(); // Permite que a solicitação continue para a próxima rota ou middleware
}

module.exports = {
  verifyToken,
  verifyPermissions,
};
