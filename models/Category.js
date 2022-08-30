const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  data: {
    type: Schema.Types.Mixed,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category, categorySchema };
