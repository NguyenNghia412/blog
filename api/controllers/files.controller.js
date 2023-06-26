const { uploadFile } = require("../middleware/files/upload");

const postFile = async (req, res, next) => {
    try {
        uploadFile.single('file')(req, res, err => {
            if (err) {
                next(error);
            }

            console.log(req.file);
            const fileName = req.file.filename;

            res.status(200).json({
                path: `public/files/${fileName}`
            });
        })
        // res.status(200).end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    postFile
}