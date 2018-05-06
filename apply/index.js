const multer = require("multer");

const handle = require("./handle");
const validate = require("./validate");

module.exports = app => app.post("/apply", multer().any(), validate, handle);
