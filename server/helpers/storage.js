const multer = require('multer');
const mkdirp = require('mkdirp');

const uploadRootFolder = 'images'

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, 'images');
        mkdirp(uploadRootFolder, err => cb(err, uploadRootFolder))
    },
    filename: (req, file, cb) => {
        let datetimestamp = Date.now();
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[0] + '.' + fileType;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};



const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single(
    'image'
);

module.exports = storage;