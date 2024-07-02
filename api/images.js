const fs = require('fs');
const path = require('path');

const IMAGE_FOLDER = path.join(__dirname, '../public/images');

module.exports = (req, res) => {
    fs.readdir(IMAGE_FOLDER, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        const images = files.filter(file => /\.(webp|jpg|jpeg|png|gif)$/.test(file));
        res.json(images);
    });
};