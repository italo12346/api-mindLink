const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Post = connection.define("post", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Post.sync({ force: false }); // Sincronizar, depois que executar o codigo a primeira vez desabilite essa linha

module.exports = Post;
