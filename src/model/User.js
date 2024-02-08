const Sequelize = require("sequelize");
const connection = require("../database/connection");

const User = connection.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Garante que o campo seja um endereço de e-mail válido
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("user"),
    allowNull: false,
    defaultValue: "user",
  },
});

User.sync({ force: false }); // Sincronizar, depois que executar o código a primeira vez desabilite essa linha

module.exports = User;
