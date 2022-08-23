const path = require("path");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const regitsterUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Incorect data" });
  }

  const { name, lastName, email, password } = req.body;

  const candidate = User.findOne({ email })
    .then(() => {
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      const hashedPassword = bcrypt.hash(password, 12);

      const user = new User({
        name,
        lastName,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then(() => {
          res.status(201).json({ message: "User registered" });
        })
        .catch((err) => {
          res.status(404).json({ message: "Something went wrong" });
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(404).json({ message: "Something went wrong" });
      console.log(err);
    });
};

const regitsterUserValidator = [
  check("email", "Incorect email").isEmail(),
  check("password", "Incorect password").isLength({ min: 6 }),
];

const loginUser = (req, res) => {};

module.exports = {
  regitsterUser,
  regitsterUserValidator,
  loginUser,
};
