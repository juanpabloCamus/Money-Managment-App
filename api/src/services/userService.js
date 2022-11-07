const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { user } = require('../database');

const registerUser = (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    //
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
