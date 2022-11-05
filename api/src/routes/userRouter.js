const { Router } = require('express');

const { registerUser } = require('../services/userService');

const router = Router();

router.get('/register', registerUser);

module.exports = router;
