const Product = require("../models/Product");

const postProduct = (req, res) => {
  const {
    title,
    description,
    createdAt,
    lastUpdatedAt,
    author,
    available,
    delivery,
    prices,
    categories,
    rating,
    comments,
  } = req.body;

  const product = new Product({
    title,
    description,
    createdAt,
    lastUpdatedAt,
    author,
    available,
    delivery,
    prices,
    categories,
    rating,
    comments,
  });

  product
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
      console.log(err);
    });
};

const getProduct = (req, res) => {};

module.exports = { postProduct, getProduct };
