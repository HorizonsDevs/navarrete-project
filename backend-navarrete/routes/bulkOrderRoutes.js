const express = require('express');
const bulkOrderController = require('../controllers/bulkOrderController');

const router = express.Router();

router.get('/', bulkOrderController.getAllBulkOrders);
router.get('/:id', bulkOrderController.getBulkOrderById);
router.post('/', bulkOrderController.createBulkOrder);
router.put('/:id', bulkOrderController.updateBulkOrder);
router.delete('/:id', bulkOrderController.deleteBulkOrder);

module.exports = router;
