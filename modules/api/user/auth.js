const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/auth");
const UserService = require("./userService");
const userService = new UserService();
const userValidators = require("./userValidators");

// @route  GET api/auth
// @desct  Given a JSON web token, it returns a user if the token is valid
// @access Prrivate/requires token
// Passing the 'auth' middleware will execute the middleware function that will be executed before the callback.
router.get("/", auth, async (req, res) => {
  try {
    const user = await userService.getById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desct  Authenticate user & get token
// @access Public/non-authentication/no-token
router.post("/", userValidators.auth, async (req, res) => {
  const { userIdentifier, password } = req.body;
  console.log(userIdentifier, "-> ", password);

  try {
    const token = await userService.authenticate(userIdentifier, password);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
