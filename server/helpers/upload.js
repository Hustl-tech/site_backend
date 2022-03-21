const multer = require('multer');

const storage = require('./storage');

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});

module.exports = upload;