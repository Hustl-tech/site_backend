const express = require('express');

const userCtrl = require('./user.controller');
const authCheck = require('../middleware/auth_check');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/me')
    /** GET /api/user/me - Returns current user */
    .get(authCheck, userCtrl.me);


module.exports = router;