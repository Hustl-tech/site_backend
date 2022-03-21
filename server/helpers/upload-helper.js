const multer = require('multer');
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const httpStatus = require('http-status');
const sharp = require('sharp');

const APIError = require('./../helpers/APIError');
const Resize = require('../helpers/resize');

const uploadRootFolder = 'images/blogs';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        mkdirp(uploadRootFolder, err => cb(err, uploadRootFolder))
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname).toLowerCase();

        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            const err = new APIError('Only images are allowed', httpStatus.NOT_ACCEPTABLE, true);
            return callback(err);
        }
        callback(null, true)
    },
    limits: {
        fileSize: 4 * 1024 * 1024
    }

}).single('upload');



function uploadMulter(req, res, next) {
    return new Promise(function(resolve, reject) {
        upload(req, res, function(err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    err = new APIError('File size must be less than 2MB.', httpStatus.NOT_ACCEPTABLE, true);
                }
                return next(err);
            }
            // No error occured.
            resolve(req.file.filename);
        });
    })
}


module.exports = {
    uploadMulter,
}