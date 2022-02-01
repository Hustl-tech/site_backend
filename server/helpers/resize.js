const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer) {
        const filename = Resize.filename();
        const filepath = this.filepath(filename);

        sharp(buffer)
            .metadata()
            .then(function(metadata) {
                return sharp(buffer)
                    .resize(Math.round(metadata.width / 2))
                    .webp({ nearLossless: true, quality: 50, alphaQuality: 70, chromaSubsamplin: '4.4.4', force: false })
                    .toFile(filepath)
            });

        return filename;
    }
    static filename() {
        return `${uuidv4()}.webp`;
    }
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;