const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { user } = require('../database');

const registerUser = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    const alreadyRegister = await user.findOne({ where: { email } });
    if (alreadyRegister) return res.status(400).json({ error: 'This email is already registered!' });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      email,
      name,
      passwordHash,
    });

    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
