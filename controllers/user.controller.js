const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
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

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = new User({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
};

const regitsterUserValidator = [
  check("email", "Incorect email").isEmail(),
  check("password", "Incorect password").isLength({ min: 6 }),
];

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      await bcrypt.compare(password, user.password, function (err, data) {
        if (err) return res.status(400).json({ message: "Incorect password" });

        if (data) {
          const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
            expiresIn: "1h",
          });

          res.json({ token, userId: user.id });
        }
      });
    } else {
      res.status(400).json({ message: "Wrong email" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
};

module.exports = {
  regitsterUser,
  regitsterUserValidator,
  loginUser,
};
