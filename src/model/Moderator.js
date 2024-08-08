const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Post = require("./Post");

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

Moderator.hasMany(Post); // Um moderador pode ter muitos posts
Post.belongsTo(Moderator); // Um post pertence a um moderador

Moderator.sync({ force: false });
module.exports = Moderator;
