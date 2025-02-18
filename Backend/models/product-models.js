const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  stock_quantity: {
    type: Number,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
