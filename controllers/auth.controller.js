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

    const { name, lastName, email, password, isPassword } = req.body;

    if (!isPassword) {
      return res.status(400).json({ message: "Passwords have to match" });
    }
    
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
  check("name", "Enter your name").contains(),
  check("name", "Your name must be longer than 3 letters").isLength({ min: 3 }),
  check("lastName", "Enter your last name").contains(),
  check("email", "Enter your email").contains(),
  check("email", "Incorect email").normalizeEmail().isEmail(),
  check("password", "Enter your password").contains(),
  check("password", "Your password must be longer than 6 letters").isLength({
    min: 6,
  }),
];

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
          expiresIn: "1h",
        });

        res.json({ token, userId: user.id });
      } else {
        res.status(400).json({ message: "Incorect password" });
      }
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
