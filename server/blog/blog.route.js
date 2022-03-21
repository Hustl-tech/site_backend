const express = require('express');

const authCheck = require('../middleware/auth_check');

const upload = require('../helpers/upload');

const blogCtrl = require('./blog.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/blog - Get list of blogs */
    .get(blogCtrl.list)
    /** POST /api/blog - Create new blog */
    .post(authCheck, upload.single('image'), blogCtrl.create);

router.route('/posts')
    /** GET /api/blog/posts */
    .get(authCheck, blogCtrl.listUserPosts)

router.route('/:id')
    /** GET /api/blog/:blogId/ */
    .get(blogCtrl.detail)




module.exports = router;


// , validate((paramValidation.blog))