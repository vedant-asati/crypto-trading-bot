const express = require('express');
const {login,signUp,buyMembership} = require('../Controllers/authController');

const router= express.Router();

router.post('/login',login)
router.post('/signup',signUp)
router.post('/buyMembership',buyMembership)

module.exports = router;
