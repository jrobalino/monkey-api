const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/checkAuth');
const ProfilesController = require('../controllers/profiles');

router.get('/', checkAuth, ProfilesController.profiles_view);

module.exports = router;