const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const newfileName = `file_${uniqueSuffix}${ext}`;
        cb(null, newfileName)
    }
})

const uploadFile = multer({ storage: storage });

module.exports = { uploadFile };