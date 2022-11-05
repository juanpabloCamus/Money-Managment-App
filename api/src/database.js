const { Sequelize } = require('sequelize');
const User = require('./models/User');
const Operation = require('./models/Operation');

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
} = process.env;

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false,
});

User(db);
Operation(db);

module.exports = {
  db,
};
