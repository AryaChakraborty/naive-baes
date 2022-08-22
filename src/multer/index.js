const multer = require("multer");
const path = require("path");
let i = 1;

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, `../../static/uploads`));
    },
    filename: function (req, file, callback) {
        //* LicenseID to be taken from cookies
        // callback(null, `${licenseID}-${i++}` + path.extname(file.originalname));
        callback(null, file.originalname);
    }
});

//TODO: If we thought to not use diskStorage
// const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
});

module.exports = { upload, storage };
