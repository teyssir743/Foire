const express = require('express');
const authController = require('../Controller/authController');
const router = express.Router();



router.post('/activate', authController.activation);

router.post('/register', authController.register);
router.post('/login', authController.login)

router.post('/ask_for_reset_password', authController.askForResetPassword)

router.post('/reset_password/:id', authController.resetPassword)

module.exports = router;
