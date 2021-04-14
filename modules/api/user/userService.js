const User = require("../../models/User");

class UserService {
  async Signup(userDTO) {
    const { name, userName, email, password } = userDTO;

    let mailFound = await User.findOne({ email }).exec();
    let userNameFound = await User.findOne({ userName }).exec();
    if (userNameFound || mailFound) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
  }
}
