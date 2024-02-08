const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Moderator = connection.define("moderator", {
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
    type: Sequelize.ENUM("moderator"),
    allowNull: false,
    defaultValue: "moderator",
  },
  // Você pode adicionar mais campos conforme necessário, como data de criação, data de modificação, etc.
});

Moderator.sync({ force: false }); // Sincronizar, depois que executar o código a primeira vez desabilite essa linha

module.exports = Moderator;
