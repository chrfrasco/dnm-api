const { validationResult } = require("express-validator/check");
const { matchedData } = require("express-validator/filter");

const handle = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const submission = matchedData(req);
  res.json(submission);
};

module.exports = handle;
