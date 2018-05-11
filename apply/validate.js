const { check } = require("express-validator/check");

module.exports = [
  check("first-name")
    .isAlpha()
    .trim(),

  check("last-name")
    .isAlpha()
    .trim(),

  check("email")
    .isEmail()
    .trim()
    .normalizeEmail(),

  check("bio").isLength({ min: 1 }).trim(),

  check("field").isIn([
    "hair designer",
    "make-up artist",
    "stylist",
    "photographer",
    "location scout",
    "art director"
  ]),

  check("region").isIn([
    "Auckland",
    "Bay of Plenty",
    "Canterbury",
    "Chatham Islands",
    "Gisborne",
    "Hawke's Bay",
    "Manawatu-Wanganui",
    "Marlborough",
    "Nelson",
    "Northland",
    "Otago",
    "Southland",
    "Taranaki",
    "Tasman",
    "Waikato",
    "Wellington",
    "West Coast"
  ]),

  check("portfolio").isURL(),

  check("social-media")
    .isArray()
    .isURL(),

  check("images")
    .custom(atLeastOneFile)
    .withMessage("must include at least one image")
    .custom(allFilesMatch(/(\.jpg)|(\.png)$/))
    .withMessage("images must be png or jpg")
];

function atLeastOneFile(value, { req }) {
  return req.files != null && req.files.length > 0;
}

function allFilesMatch(re) {
  return (value, { req }) =>
    req.files.every(file => re.test(file.originalname));
}
