const { Router } = require('express');

const { registerUser } = require('../services/userService');

const router = Router();

router.post('/register', registerUser);

module.exports = router;
