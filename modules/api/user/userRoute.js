const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/auth");
const UserService = require("./userService");
const userValidators = require("./userValidators");
const userService = new UserService();

// Exporting two objects
const { check, validationResult } = require("express-validator");

// Returns a moongose model of the user
const User = require("../../../models/User");

// route to create a new user
// @route  POST api/user
// @desct  Register user
// @access Public/non-authentication/no-token
router.post("/", userValidators.signUp, async (req, res) => {
  try {
    token = await userService.signUp(req.body);
    res.json({ token });
  } catch (err) {
    if (err.name == "ArrayError") {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route  POST api/user/update
// @desct  Update existing user's data
// @access Private/requires token
// Passing the 'auth' middleware will execute the middleware function that will be executed before the callback.
// Given a JSON web token, it updates a user if the token is valid and corresponds to the user id
router.post("/update", auth, userValidators.update, async (req, res) => {
  try {
    userService.update(req.user.id, req.body);
    res.send("User updated");
  } catch (err) {
    if (err.name == "ArrayError") {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).send("Server error");
  }
});

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
