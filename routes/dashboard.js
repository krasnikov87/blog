const express = require('express');
const router  = express.Router();
const authMiddleware = require('../middleware/auth');
const login = require('../controllers/login');

router.get('/signin', login.form);
router.post('/login', login.signin);

router.get('/category', authMiddleware, (req, res) => {res.status(200).json({message: 'categories'})});

module.exports = router;
