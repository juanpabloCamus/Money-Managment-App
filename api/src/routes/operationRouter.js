const { Router } = require('express');

const {
  postOperation,
  getUserOperations,
} = require('../services/operationService');

const router = Router();

router.post('/:userId', postOperation);
router.get('/:userId/:offset', getUserOperations);

module.exports = router;
