const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(express.json());

const authController = require('../controller/authController');

router.use(cors({
    origin: '*'
}));

router.post('/login', authController.login, (req, res) => {
    res.send('Login successful');
});

router.post('/register', authController.register, async (req, res) => {
    res.send('Register successful');
});

module.exports = router;