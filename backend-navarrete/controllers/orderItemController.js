const orderItemService = require('../services/orderItemService');

exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await orderItemService.getAllOrderItems();
        res.json(orderItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching order items');
    }
};

exports.getOrderItemById = async (req, res) => {
    try {
        const orderItem = await orderItemService.getOrderItemById(req.params.id);
        if (!orderItem) {
            return res.status(404).send('Order item not found');
        }
        res.json(orderItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching order item');
    }
};

exports.createOrderItem = async (req, res) => {
    try {
        const orderItem = await orderItemService.createOrderItem(req.body);
        res.status(201).json(orderItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order item');
    }
};

exports.updateOrderItem = async (req, res) => {
    try {
        const orderItem = await orderItemService.updateOrderItem(req.params.id, req.body);
        if (!orderItem) {
            return res.status(404).send('Order item not found');
        }
        res.json(orderItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating order item');
    }
};

exports.deleteOrderItem = async (req, res) => {
    try {
        const success = await orderItemService.deleteOrderItem(req.params.id);
        if (!success) {
            return res.status(404).send('Order item not found');
        }
        res.send('Order item deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting order item');
    }
};
