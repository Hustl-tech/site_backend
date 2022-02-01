const express = require('express');
const validate = require('express-validation');

const paramValidation = require('../../config/param-validation');
const authCheck = require('../middleware/auth_check');

const storage = require('../helpers/storage');
const upload = require('../helpers/upload');

const blogCtrl = require('./blog.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/blog - Get list of blogs */
    .get(blogCtrl.list)
    /** POST /api/blog - Create new blog */
    .post(authCheck, upload.single('image'), blogCtrl.create);



module.exports = router;


// , validate((paramValidation.blog))