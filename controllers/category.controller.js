const UrlSafeString = require("url-safe-string"),
  tagGenerator = new UrlSafeString();

const {Category} = require("../models/Category");

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

const getCategory = (req, res) => {
  const id = req.params.id;

  Category.findById(id)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

const getCategoryByPath = (req, res) => {
  const slug = "/" + req.params.parent;
  const children = req.params.children ? "/" + req.params.children : "";

  Category.findOne({ category: slug + children })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

const getCategoryByName = async (req, res) => {
  try {
    const name = req.params.name;

    const categories = await Category.find({});

    if (categories) {
      categories.map((category, i) => {
        if (tagGenerator.generate(category.title) === name) {
          return res.status(201).json(category);
        }
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCategoryChlidrens = async (req, res) => {
  const parent = "/" + req.params.parent;
  const children = req.params.children ? "/" + req.params.children : "";

  const childrens = await Category.find({ parent: parent + children });

  if (childrens) {
    res.status(201).json(childrens);
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCategoryParent = async (req, res) => {
  const slug = "/" + req.params.parent;
  const children = req.params.children ? "/" + req.params.children : "";

  const object = await Category.findOne({ category: slug + children });

  if (object) {
    Category.findOne({ category: object.parent })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  postCategory,
  getCategory,
  getCategoryByPath,
  getCategoryChlidrens,
  getCategoryParent,
  getCategoryByName,
};
