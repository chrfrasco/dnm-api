const express = require("express");
const morgan = require("morgan");

const apply = require("./apply");

const PORT = process.env.PORT || 5000;

(async () => {
  const app = express();

  app.use(morgan("combined"));

  const whitelistENV = process.env.WHITELIST;
  const whitelist = whitelistENV 
    ? whitelistENV.split(",")
    : [];
  app.use((req, res, next) => {
    const origin = req.get("origin");
    if (whitelist.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    next();
  });

  app.use("/apply", await apply());

  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(err);
    next(err);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(500).send("something went wrong");
  });

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`app listening on :${PORT}`));
})();
