const path = require("path");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const regitsterUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Incorect data", errors: errors.array() });
    }

    const { name, lastName, email, password } = req.body;

    console.log(req.body);

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    console.log("Checked candidate")

    const hashedPassword = bcrypt.hashSync(password, 12);

    console.log("Hashed Password")

    const user = new User({
      name,
      lastName,
      email,
      password:hashedPassword,
    });

    console.log("Created User")

    await user.save();

    console.log("Saved User")

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(err);
  }
};

const regitsterUserValidator = [
  check("email", "Incorect email").isEmail(),
  check("password", "Incorect password").isLength({min:6}),
];

const loginUser = (req, res) => {};

module.exports = {
  regitsterUser,
  regitsterUserValidator,
  loginUser,
};
