const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, `../static/uploads/`));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

module.exports = { upload, storage }