const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Post = require("./Post");

const Comments = connection.define("Comments", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// Relacionamento entre tabelas
Comments.belongsTo(Post); // Estabelece uma relação de muitos para um (muitos artigos pertence a uma categoria)
Post.hasMany(Comments); // Estabelece uma relação de um para muitos (uma categoria tem muitos artigos)

Comments.sync({ force: false }); // Sincroniza a definição do modelo com o banco de dados (force: false não recria a tabela se ela já existir)

module.exports = Comments;
