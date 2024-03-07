const Sequelize = require("sequelize");
require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

const connection = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.DB_TIMEZONE,
  }
);

module.exports = connection;
