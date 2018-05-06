const express = require("express");

const apply = require("./apply");

const PORT = process.env.PORT || 5000;

const app = express();

apply(app);

app.listen(
  PORT,
  () => console.log(`app listening on :${PORT}`) // eslint-disable-line
);
