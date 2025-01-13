const bulkOrderService = require('../services/bulkOrderService');

exports.getAllBulkOrders = async (req, res) => {
    try {
        const bulkOrders = await bulkOrderService.getAllBulkOrders();
        res.json(bulkOrders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching bulk orders');
    }
};

exports.getBulkOrderById = async (req, res) => {
    try {
        const bulkOrder = await bulkOrderService.getBulkOrderById(req.params.id);
        if (!bulkOrder) {
            return res.status(404).send('Bulk order not found');
        }
        res.json(bulkOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching bulk order');
    }
};

exports.createBulkOrder = async (req, res) => {
    try {
        const bulkOrder = await bulkOrderService.createBulkOrder(req.body);
        res.status(201).json(bulkOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating bulk order');
    }
};

exports.updateBulkOrder = async (req, res) => {
    try {
        const bulkOrder = await bulkOrderService.updateBulkOrder(req.params.id, req.body);
        if (!bulkOrder) {
            return res.status(404).send('Bulk order not found');
        }
        res.json(bulkOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating bulk order');
    }
};

exports.deleteBulkOrder = async (req, res) => {
    try {
        const success = await bulkOrderService.deleteBulkOrder(req.params.id);
        if (!success) {
            return res.status(404).send('Bulk order not found');
        }
        res.send('Bulk order deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting bulk order');
    }
};
