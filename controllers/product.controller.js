const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");

const postProduct = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Incorect data", errors: errors.array() });
  }
  
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
      console.log(err); 
      res.status(500).json({ message: "Something went wrong" });
    });
};

const postProductValidator = [
  check("title", "Enter product title").contains(),
  check("description", "Enter product description").contains(),
  check("available", "Enter how much products are available").contains(),
  // check("name", "Your name must be longer than 3 letters").isLength({ min: 3 }),
  // check("lastName", "Enter your last name").contains(),
  // check("email", "Enter your email").contains(),
  // check("email", "Incorect email").normalizeEmail().isEmail(),
  // check("password", "Enter your password").contains(),
  // check("password", "Your password must be longer than 6 letters").isLength({
  //   min: 6,
  // }),
];

const getProduct = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getProducts = async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.status(201).json(products);
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { postProduct, postProductValidator, getProduct, getProducts };
