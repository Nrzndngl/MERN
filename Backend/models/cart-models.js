const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  user_id: {
    type: String,
    required: false,
  },
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
