const express = require('express');

const { getAllUsers, getUser, updateUser } = require('../controllers/user.controller');
const { protectRoute } = require('../middleware/auth.middleware');

const router = express.Router();

router.get("", protectRoute, getAllUsers);
router.get("/:userId", protectRoute, getUser);

router.patch("/:userId", protectRoute, updateUser);

module.exports = router;