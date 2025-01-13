const express = require('express');
const auditLogController = require('../controllers/auditLogController');

const router = express.Router();

router.get('/', auditLogController.getAllAuditLogs);
router.get('/:id', auditLogController.getAuditLogById);
router.post('/', auditLogController.createAuditLog);
router.put('/:id', auditLogController.updateAuditLog);
router.delete('/:id', auditLogController.deleteAuditLog);

module.exports = router;
