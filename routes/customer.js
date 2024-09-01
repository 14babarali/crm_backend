const express = require('express');
const Customer = require('../models/Customer');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Retrieve all customers
router.get('/', protect, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new customer
router.post('/', protect, async (req, res) => {
    const customer = new Customer(req.body);
    try {
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update customer details
router.put('/:id', protect, async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(customer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a customer
router.delete('/:id', protect, async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;








// const express = require('express');
// const Customer = require('../models/Customer');
// const router = express.Router();

// // Retrieve all customers
// router.get('/customers', async (req, res) => {
//     try {
//         const customers = await Customer.find();
//         res.json(customers);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Add a new customer
// router.post('/customers', async (req, res) => {
//     const customer = new Customer(req.body);
//     try {
//         const newCustomer = await customer.save();
//         res.status(201).json(newCustomer);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Update customer details
// router.put('/customers/:id', async (req, res) => {
//     try {
//         const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(customer);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Delete a customer
// router.delete('/customers/:id', async (req, res) => {
//     try {
//         await Customer.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Customer deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;
