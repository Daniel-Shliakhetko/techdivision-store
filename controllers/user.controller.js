const User = require("../models/User");

const getUser = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
  
    User.findByIdAndDelete(id)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  };

module.exports = {
  getUser,
  deleteUser,
};
