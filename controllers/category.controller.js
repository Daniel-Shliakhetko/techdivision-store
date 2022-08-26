const UrlSafeString = require("url-safe-string"),
  tagGenerator = new UrlSafeString();

const Category = require("../models/Category");

const postCategory = async (req, res) => {
  try {
    const { parent, title, description, data } = req.body;

    const category = parent + "/" + tagGenerator.generate(title);

    const categoryObj = new Category({
      category,
      parent,
      title,
      description,
      data,
    });

    categoryObj
      .save()
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(e);
  }
};

const getCategory = async (req, res) => {
  const id = req.params.id;

  Category.findById()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

module.exports = {
  postCategory,
  getCategory,
};
