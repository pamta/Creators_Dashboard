const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Exporting two objects
const { check, validationResult } = require("express-validator/check");

// Returns a moongose model of the user
const User = require("../../models/User");

// @route  POST api/users
// @desct  Register users
// @access Public/non-authentication/no-token
router.post(
  "/",
  [
    // Second parameter of check is a custom error message
    // Checks for the value of a json key called "name"
    check("name", "A name is required").not().isEmpty(),
    check("user", "A user name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    // The check is done with the second parameter of above within []
    // Pass the request whose body has a json element

     // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 is for a bad request
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    
    //we get the alredy checked payload
    const { name, user, email, password } = req.body;

    try {
      // Check if there's a user with that email (since we put emails as unique)
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

    registrationDate = String(Date.now())

      user = new User({
        name,
        email,
        userName,
        password,
        registrationDate
      });


      // 10 is recommended in documentation, the bigger the number means more security
      const salt = await bcrypt.genSalt(10);

      // Encrypt the password
      user.password = await bcrypt.hash(password, salt);
      // Remember that User is a moongose model and we connected moongose with our database
      await user.save();

      const payload = {
        user: {
          id: user.id, // Moongose gets the id of the database
        },
      };

      // Generate a JSON Web Token (encrypted payload with signature)
      jwt.sign(
        payload,
        config.get("jwtSecret"), // encryption key
        { expiresIn: 360000 },
        // Callback
        (err, token) => {
          // If there's an error, throw it
          if (err) throw err;
          // Else, set in the json of the response this web token with
          // the user id that can be used for authentication after sign up
          res.json({ token });
        }
      );

      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

    //for debugging
    //res.send('POST request to register user')
  }
);

module.exports = router;