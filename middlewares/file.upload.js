const path = require('path');
const multer = require('multer');
const { STATIC_PATH } = require('../config/config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});
const upload = multer({ storage });

module.exports.uploadImages = upload.array('images', 5);