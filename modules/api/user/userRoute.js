const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../../middleware/auth");

// Exporting two objects
const { check, validationResult } = require("express-validator");

// Returns a moongose model of the user
const User = require("../../../models/User");

// route to create a new user
// @route  POST api/user
// @desct  Register user
// @access Public/non-authentication/no-token
router.post(
  "/",
  [
    // Second parameter of check is a custom error message
    // Checks for the value of a json key called "name"
    check("name", "A name is required").not().isEmpty(),
    check("userName", "A user name is required")
      .not()
      .isEmpty()
      .not()
      .isEmail(), //to prevent from erroniously use an email as user name
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
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
    const { name, userName, email, password } = req.body;

    try {
      // Check if there's a user with that email o that userName (since we put emails and usernames as unique)
      let mailFound = await User.findOne({ email }).exec();
      let userNameFound = await User.findOne({ userName }).exec();
      if (userNameFound || mailFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //save current date in the created use. May use some other format so it is up to changes
      const registrationDate = Date.now();
      const updateDate = registrationDate;

      user = new User({
        name,
        email,
        userName,
        password,
        registrationDate,
        updateDate,
      });

      // 10 is recommended in documentation, the bigger the number means more security
      const salt = await bcrypt.genSalt(10);

      // // Encrypt the password
      user.password = await bcrypt.hash(password, salt);
      // // Remember that User is a moongose model and we connected moongose with our database
      await user.save();

      const payload = {
        user: {
          id: user.id, // Moongose gets the id of the database
        },
      };

      // // Generate a JSON Web Token (encrypted payload with signature)
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
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
    //res.send('POST request to register user')
  }
);

// @route  POST api/user/update
// @desct  Update existing user's data
// @access Private/requires token
// Passing the 'auth' middleware will execute the middleware function that will be executed before the callback.
// Given a JSON web token, it updates a user if the token is valid and corresponds to the user id
router.post(
  "/update",
  auth,
  [
    // Second parameter of check is a custom error message
    // Checks for the value of a json key called "name"
    check("name", "A name is required").not().isEmpty(),
    check("userName", "A user name is required")
      .not()
      .isEmpty()
      .not()
      .isEmail(), //to prevent from erroniously use an email as user name
    check("email", "Please include a valid email").isEmail(),
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
    const { name, userName, email } = req.body;

    try {
      //user exist in req because of the auth middleware
      const tokenUser = req.user;

      // Check if there's a user with that id
      let userFound = await User.findById(tokenUser.id).exec();

      if (!userFound) {
        return res.status(400).json({ errors: [{ msg: "User non existent" }] });
      }

      const updateDate = Date.now();

      await User.findByIdAndUpdate(
        tokenUser.id,
        {
          name: name,
          email: email,
          userName: userName,
          updateDate: updateDate,
        },
        (err, doc) => {
          if (err) {
            console.error(err.message);
            res.status(500).send(`DB error: ${err}`);
          }
        }
      ).exec();

      res.send("User updated");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// @route  POST api/user/
// @desct  Delete existing user profile
// @access Private/requires token
// Passing the 'auth' middleware will execute the middleware function that will be executed before the callback.
// Given a JSON web token, will delete a user if the token is valid and corresponds to the user id
router.delete("/", auth, async (req, res) => {
  try {
    //user exist in req because of the auth middleware
    const tokenUser = req.user;

    // Check if there's a user with that id
    let userFound = await User.findById(tokenUser.id).exec();

    if (!userFound) {
      return res.status(400).json({ errors: [{ msg: "User non existent" }] });
    }

    await User.remove({ _id: tokenUser.id }, (err, doc) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("DB error");
      }
    }).exec();

    res.send("User deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
