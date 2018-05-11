const { validationResult } = require("express-validator/check");
const { matchedData } = require("express-validator/filter");

const templates = require("./templates");
const mail = require("../mail");

const handle = transport => async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const submission = matchedData(req);
  const message = mail.createMessage({
    name: `${submission["first-name"]} ${submission["last-name"]}`,
    text: templates.emailText(submission),
    html: templates.emailHTML(submission),
    files: req.files
  });
  const url = await mail.sendMail(transport, message);

  res.json(Object.assign({ url }, submission));
};

module.exports = handle;
