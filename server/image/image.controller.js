const imageProcess = require('../helpers/imageProcess');

async function upload(req, res, next) {
    const imageName = await imageProcess(req, res, next);
    res.json({ url: 'http://localhost:4040/images/' + imageName });
}

module.exports = {
    upload
}