const express = require('express');
const router = express.Router();

const home = require('./modules/home');
const restaurant = require('./modules/restaurant')
const user = require('./modules/user');

router.use('/' , home);
router.use('/restaurants' , restaurant);
router.use('/users' , user)


module.exports = router;