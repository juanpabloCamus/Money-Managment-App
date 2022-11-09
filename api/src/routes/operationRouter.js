const { Router } = require('express');

const {
  postOperation,
  getUserOperations,
  putOperation,
  deleteOperation,
} = require('../services/operationService');

const router = Router();

router.get('/:userId/:offset', getUserOperations);
router.post('/:userId', postOperation);
router.put('/:opId', putOperation);
router.delete('/:opId', deleteOperation);

module.exports = router;
