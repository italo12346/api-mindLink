const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Admin = connection.define("admin", {
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
  profileImage: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  role: {
    type: Sequelize.ENUM("admin"),
    allowNull: false,
    defaultValue: "admin",
  },
  // Outros campos adicionais conforme necessário
});

Admin.sync({ force: false }); // Sincronizar, depois que executar o código a primeira vez desabilite essa linha

module.exports = Admin;
