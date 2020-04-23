const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    title: String
  },
  { versionKey: false }
);

module.exports = mongoose.model("Category", CategorySchema);
