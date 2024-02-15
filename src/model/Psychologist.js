const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Psychologist = connection.define("psychologist", {
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
  profilePicturePath: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  specialties: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  approach: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("psychologist"),
    allowNull: false,
    defaultValue: "psychologist",
  },

  // Você pode adicionar mais campos conforme necessário, como data de criação, data de modificação, etc.
});

Psychologist.sync({ force: false }); // Sincronizar, depois que executar o código a primeira vez desabilite essa linha

module.exports = Psychologist;
