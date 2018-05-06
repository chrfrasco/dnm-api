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

  check("field").isIn([
    "hair designer",
    "make-up artist",
    "stylist",
    "photographer",
    "location scout",
    "art director"
  ]),

  check("region").isAlpha(),

  check("portfolio").isURL(),

  check("social")
    .isArray()
    .isURL(),

  check("images")
    .custom((value, { req }) => req.files != null && req.files.length > 0)
    .withMessage("must include at least one image")
    .custom((value, { req }) =>
      req.files.every(file => /(\.jpg)|(\.png)$/.test(file.originalname))
    )
    .withMessage("images must be png or jpg")
];
