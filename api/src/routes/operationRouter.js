const { Router } = require('express');

const {
  postOperation,
  getUserOperations,
  putOperation,
} = require('../services/operationService');

const router = Router();

router.post('/:userId', postOperation);
router.put('/:opId', putOperation);
router.get('/:userId/:offset', getUserOperations);

module.exports = router;
