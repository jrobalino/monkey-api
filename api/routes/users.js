const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.get('/', UsersController.users_test_user);

module.exports = router;