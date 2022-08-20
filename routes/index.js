const express = require('express');
const { authenticator } = require('../middleware/auth')
const router = express.Router();

const home = require('./modules/home');
const restaurant = require('./modules/restaurant')
const user = require('./modules/user');
const auth = require('./modules/auth');

router.use('/restaurants' , authenticator , restaurant);
router.use('/users' , user);
router.use('/auth' , auth);
router.use('/' , authenticator , home);


module.exports = router;