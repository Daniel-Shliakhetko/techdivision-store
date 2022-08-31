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
    });
};

const getProduct = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { postProduct, getProduct };
