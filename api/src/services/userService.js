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

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userExists = await user.findOne({ where: { email } });

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, userExists.dataValues.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'Invalid user or password',
      });
    }

    const { name, id, money } = userExists.dataValues;

    const userForToken = {
      id, name, email, money,
    };
    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    return res.status(200).send({
      ...userForToken, token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
