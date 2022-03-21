const express = require('express');
const multer = require('multer');

const imageCtrl = require('./image.controller');

const router = express.Router(); // eslint-disable-line new-cap
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('')
    /** POST /api/uploadImage - Post new image */
    .post(upload.single('upload'), imageCtrl.upload);


module.exports = router;