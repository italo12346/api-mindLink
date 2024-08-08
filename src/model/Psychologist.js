const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Post = require("./Post");

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
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  profilePicturePath: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "https://cdn-icons-png.flaticon.com/512/6073/6073874.png",
  },
  specialties: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "No specialty specified",
  },
  approach: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "No specialty specified",
  },
  crp: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "No specialty specified",
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0,
  },
});

Psychologist.hasMany(Post); // Um psicólogo pode ter muitos posts
Post.belongsTo(Psychologist); // Um post pertence a um psicólogo

Psychologist.sync({ force: false });
module.exports = Psychologist;
