const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowedExt = /\.(jpeg|jpg|png|pdf|txt)$/i;
  const allowedMime = /^(image\/(jpeg|png)|application\/pdf|text\/plain)$/;
  const extOk = allowedExt.test(path.extname(file.originalname));
  const mimeOk = allowedMime.test(file.mimetype);
  cb(null, extOk && mimeOk);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
module.exports.singleUpload = (fieldName) => upload.single(fieldName);
