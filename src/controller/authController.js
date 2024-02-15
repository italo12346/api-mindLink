const Admin = require("../model/Admin");
const Psychologist = require("../model/Psychologist");
const Moderator = require("../model/Moderator");
const User = require("../model/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function authenticateUser(email, password, role) {
  try {
    let user;
    switch (role) {
      case "admin":
        user = await Admin.findOne({ where: { email: email } });
        break;
      case "psychologist":
        user = await Psychologist.findOne({ where: { email: email } });
        break;
      case "moderator":
        user = await Moderator.findOne({ where: { email: email } });
        break;
      case "user":
        user = await User.findOne({ where: { email: email } });
        break;
      default:
        throw new Error("Tipo de usuário inválido");
    }

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      { id: user.id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    throw new Error("Erro ao autenticar usuário");
  }
}

async function login(req, res) {
  const { email, password, role } = req.body;

  try {
    const token = await authenticateUser(email, password, role);
    if (!token) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao autenticar usuário" });
  }
}
module.exports = {
  authenticateUser,
  login,
};
