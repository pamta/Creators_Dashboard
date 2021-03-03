const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// @route  GET api/auth
// @desct  Test route
// @access Public/non-authentication/no-token
// Passing the 'auth' middleware will execute the middleware function that will be executed before the callback.
// Given a JSON web token, it returns a user if the token is valid
router.get("/", auth, async (req, res) => {
  try {
    // The middleware auth modifies the request to have the user id if it has a correct token in the header
    // Do not pass the password.
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desct  Authenticate user & get token
// @access Public/non-authentication/no-token
router.post(
  "/",
  [
    check("userIdentifier", "Please include a valid email or user name").exists(),
    check("password", "Please, a password is required").exists(),
  ],
  async (req, res) => {
  // The check is done with the second parameter of above within []
  //res.send("auth post");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
        errors: errors.array(),
    });
  }

  const { userIdentifier, password } = req.body;
  
  console.log(userIdentifier, "-> ", password);

  try {

    //We try to find a user, first by mail, and then by userName. 
    //there is no posibility for a user name to have the same format as an email or the other way around,
    //so no user should be incorrectly identified
    let mailFound = await User.findOne({ email: userIdentifier }).exec();
    let userNameFound = await User.findOne({ userName: userIdentifier }).exec();

    let user = mailFound || userNameFound;
    // let mailFound = await User.findOne({ email });

    if (!user) {
      return res
      .status(400)
      .json({ errors: [{ msg: "Invalid credentials" }] });
    }
    
    // Check if the hash version of a non-encrypted text equals to a hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
      .status(400)
      .json({ errors: [{ msg: "Invalid credentials" }] });
    }
    
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
    
    // res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
  
module.exports = router;