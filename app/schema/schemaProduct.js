const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  imagePath: { type: String },
  title: { type: String, required: true },
  pictures: [],
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  tags: [],
  authorNumber: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
