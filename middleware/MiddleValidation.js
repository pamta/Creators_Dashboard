const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 400 is for a bad request
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};
