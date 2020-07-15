const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UsersController = require('../controllers/users');

router.post('/signup', UsersController.users_sign_up);
router.post('/login', UsersController.users_log_in);
router.delete('/:userId', UsersController.users_delete);

module.exports = router;