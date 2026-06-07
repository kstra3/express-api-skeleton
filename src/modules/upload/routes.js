const express = require('express');
const upload = require('../../middlewares/upload');
const ApiResponse = require('../../utils/response');

const router = express.Router();

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    const response = new ApiResponse(res);
    return response.error('No file uploaded', 400);
  }

  const response = new ApiResponse(res);
  response.success({
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  }, 201);
});

module.exports = router;
