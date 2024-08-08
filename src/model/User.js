const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Post = require("./Post");

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
      isEmail: true,
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
});
Post.belongsTo(User); // Estabelece uma relação de muitos para um (muitos artigos pertence a uma categoria)
User.hasMany(Post); // Estabelece uma relação de um para muitos (uma categoria tem muitos artigos)

User.sync({ force: true }); // Sincronizar, depois que executar o codigo a primeira vez desabilite essa linha

module.exports = User;
