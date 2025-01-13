const orderService = require('../services/orderService');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching orders');
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching order');
    }
};

exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order');
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.params.id, req.body);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating order');
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const success = await orderService.deleteOrder(req.params.id);
        if (!success) {
            return res.status(404).send('Order not found');
        }
        res.send('Order deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting order');
    }
};
