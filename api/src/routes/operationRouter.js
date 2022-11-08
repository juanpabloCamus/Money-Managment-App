const { Router } = require('express');

const { postOperation } = require('../services/operationService');

const router = Router();

router.post('/:userId', postOperation);

module.exports = router;
