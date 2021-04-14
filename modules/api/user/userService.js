const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const ArrayError = require("../../../utils/ArrayError");

class UserService {
  async signUp(userDTO) {
    const { name, userName, email, password } = userDTO;
    // Check if there's a user with that email o that userName (since we put emails and usernames as unique)
    let mailFound = await User.findOne({ email }).exec();
    let userNameFound = await User.findOne({ userName }).exec();
    if (userNameFound || mailFound) {
      throw new ArrayError([{ msg: "User already exists" }]);
    }

    //save current date in the created use. May use some other format so it is up to changes
    const registrationDate = Date.now();
    const updateDate = registrationDate;

    const user = new User({
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
    const token = jwt.sign(
      payload,
      config.get("jwtSecret"), // encryption key
      { expiresIn: 360000 }
    );
    return token;
  }

  async update(userID, userDTO) {
    const { name, userName, email } = userDTO;

    // Check if there's a user with that id
    let userFound = await User.findById(userID).exec();

    if (!userFound) {
      throw new ArrayError([{ msg: "User non existent" }]);
    }
    const updateDate = Date.now();

    await User.findByIdAndUpdate(
      userID,
      {
        name: name,
        email: email,
        userName: userName,
        updateDate: updateDate,
      },
      (err, doc) => {
        if (err) {
          throw new Error(err.message);
        }
      }
    ).exec();
  }

  async delete(userID) {
    // Check if there's a user with that id
    let userFound = await User.findById(userID).exec();
    if (!userFound) {
      throw new ArrayError([{ msg: "User non existent" }]);
    }

    await User.remove({ _id: userID }, (err, doc) => {
      if (err) {
        throw new Error(err.message);
      }
    }).exec();
  }
}

module.exports = UserService;
