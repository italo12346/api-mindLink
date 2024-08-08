const User = require("../model/User");
const Admin = require("../model/Admin");
const Psychologist = require("../model/Psychologist");
const Moderator = require("../model/Moderator");

async function getUserData(req, res) {
  try {
    const user = req.user;

    let userData;

    switch (user.role) {
      case "admin":
        userData = await Admin.findByPk(user.id);
        break;
      case "psychologist":
        userData = await Psychologist.findByPk(user.id);
        break;
      case "moderator":
        userData = await Moderator.findByPk(user.id);
        break;
      case "user":
        userData = await User.findByPk(user.id);
        break;
      default:
        throw new Error("Tipo de usuário inválido");
    }

    if (!userData) {
      return res
        .status(404)
        .json({ message: "Dados do usuário não encontrados" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter dados do usuário" });
  }
}
module.exports = {
  getUserData,
};
