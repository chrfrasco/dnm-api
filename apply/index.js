const express = require("express");
const multer = require("multer");

const mail = require("../mail");
const handle = require("./handle");
const validate = require("./validate");


module.exports = async () => {
  const transport = await mail.init();
  const router = express.Router();
  router.post("/", multer().any(), validate, handle(transport));
  return router;
};
