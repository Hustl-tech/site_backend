const sharp = require('sharp');
const fs = require('fs');

const imageProcess = async(req, res, next) => {
    fs.access('images', (err) => {
        if (err) {
            fs.mkdirSync('images');
        }
    });
    let datetimestamp = Date.now();
    let originalName = req.file.originalname.split(' ').join('-');
    const fileName = originalName.split('.')[0] + '-' + datetimestamp + '.' + 'webp';
    try {
        const image = await sharp(req.file.buffer)
        const metadata = await image.metadata()
        await sharp(req.file.buffer)
            .resize(Math.round(metadata.width / 1.3))
            .webp({
                nearLossless: true,
                quality: 100,
                alphaQuality: 100,
                chromaSubsamplin: '4.4.4',
                force: false
            })
            .toFile('images/' + fileName);
    } catch (e) {
        next(e);
    }

    return fileName;
}

module.exports = imageProcess;