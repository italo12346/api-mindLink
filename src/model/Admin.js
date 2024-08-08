const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Post = require("./Post");

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
      isEmail: true,
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
});

Admin.hasMany(Post); // Um admin pode ter muitos posts
Post.belongsTo(Admin); // Um post pertence a um admin

Admin.sync({ force: false });
module.exports = Admin;
