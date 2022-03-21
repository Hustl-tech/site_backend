const express = require('express');

const authRoutes = require('./server/auth/auth.route');
const blogRoutes = require('./server/blog/blog.route');
const imageRoutes = require('./server/image/image.route');
const userRoutes = require('./server/user/user.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount blog routes at /images
router.use('/user', userRoutes);

// mount blog routes at /blog
router.use('/blog', blogRoutes);

// mount blog routes at /images
router.use('/uploadImage', imageRoutes);


module.exports = router;