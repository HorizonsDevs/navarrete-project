const auditLogService = require('../services/auditLogService');

exports.getAllAuditLogs = async (req, res) => {
    try {
        const auditLogs = await auditLogService.getAllAuditLogs();
        res.json(auditLogs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching audit logs');
    }
};

exports.getAuditLogById = async (req, res) => {
    try {
        const auditLog = await auditLogService.getAuditLogById(req.params.id);
        if (!auditLog) {
            return res.status(404).send('Audit log not found');
        }
        res.json(auditLog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching audit log');
    }
};

exports.createAuditLog = async (req, res) => {
    try {
        const auditLog = await auditLogService.createAuditLog(req.body);
        res.status(201).json(auditLog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating audit log');
    }
};

exports.updateAuditLog = async (req, res) => {
    try {
        const auditLog = await auditLogService.updateAuditLog(req.params.id, req.body);
        if (!auditLog) {
            return res.status(404).send('Audit log not found');
        }
        res.json(auditLog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating audit log');
    }
};

exports.deleteAuditLog = async (req, res) => {
    try {
        const success = await auditLogService.deleteAuditLog(req.params.id);
        if (!success) {
            return res.status(404).send('Audit log not found');
        }
        res.send('Audit log deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting audit log');
    }
};
