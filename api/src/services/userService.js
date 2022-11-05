const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { user } = require('../database');

const registerUser = (req, res) => {
  const { email, name, password } = req.body;

};

module.exports = {
  registerUser,
};
