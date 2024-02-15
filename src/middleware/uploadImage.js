const express = require("express");
const multer = require("multer");
const slugify = require("slugify");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const safeFileName = slugify(originalName, { lower: true });
    cb(null, safeFileName);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
