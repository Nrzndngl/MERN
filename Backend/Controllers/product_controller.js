const multer = require("multer");
const Product = require("../models/product-models");
const Cart = require("../models/cart-models");

const products = async (req, res) => {
  console.log("Product Page");
  res.send("Product Page");
};

// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//add product
const addProduct = async (req, res) => {
  if (req.method === "GET") {
    res.render("product_form");
  } else if (req.method === "POST") {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.render("product_form", { message: "File upload failed" });
      }

      const data = req.body;

      let message = null;

      console.log("data : ", data);

      const name = data.name;
      const price = data.price;
      const description = data.description;
      const category = data.category;
      const stock_quantity = data.stock_quantity;
      const color = data.color;

      if (
        !name ||
        !price ||
        !description ||
        !category ||
        !stock_quantity ||
        !color
      ) {
        message = "All fields are required.";
      } else {
        const product = await Product.create({
          name: name,
          price: price,
          description: description,
          category: category,
          stock_quantity: stock_quantity,
          color: color,
          image: req.file ? req.file.path : null, // set image only if file is uploaded.
        });
        message = "Product added Sucessfully.";
      }
      res.render("product_form", { message: message });
    });
  }
};

//list all products
const ListProducts = async (req, res) => {
  const URL = "http://localhost:3000/";
  const search = req.query.Search;
  let products;
  if (search) {
    products = await Product.find({ name: { $regex: search, $options: "i" } });
  } else {
    products = await Product.find();
  }
  const user_id = 1;
  const cartItems = await Cart.find({ user_id: user_id });
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const data = {
    cartItems: totalQuantity,
    name: "Niranjan",
    description: " This is description",
    products: products,
  };

  // give the full url of image

  data.products.forEach((product) => {
    product.image = URL + product.image;
  });
  res.render("product_list", data);
};

// update product
const UpdateProduct = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    return res.status(400).send("Product not found.");
  }
  if (req.body.name) {
    product.name = req.body.name;
  }
  if (req.body.price) {
    product.price = req.body.price;
  }
  if (req.body.description) {
    product.description = req.body.description;
  }
  if (req.body.category) {
    product.category = req.body.category;
  }
  if (req.body.stock_quantity) {
    product.stock_quantity = req.body.stock_quantity;
  }
  if (req.body.color) {
    product.color = req.body.color;
  }
  await product.save();

  res.send("Product updated successfully.");
};

// Delete product
const DeleteProduct = async (req, res) => {
  console.log("Delete Product.");
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  return res.send("<h1>Product Deleted.</h1>");
};

//filter product
const FilterProduct = async (req, res) => {
  const filterItems = {};
  if (req.query.id) {
    filterItems.id = req.query.id;
  }
  if (req.query.name) {
    filterItems.name = req.query.name;
  }
  if (req.query.price) {
    filterItems.price = req.query.price;
  }
  const products = await Product.find(filterItems);
  res.status(200).send(products);
};

//list all products in cart
const ListCartItems = async (req, res) => {
  const user_id = 1;
  const cartItems = await Cart.find({ user_id: user_id })
    .populate("product", "name price")
    .select("quantity");

  const totalPrice = cartItems.reduce(
    (total, cart) => total + cart.quantity * cart.product.price,
    0
  );

  data = {
    cartItems: cartItems,
    totalPrice: totalPrice,
  };
  console.log("Cart items", data);
  return res.render("listcart", data);
};

//removes a cart item
const removeFromcart = async (req, res) => {
  const user_id = req.params.id;
  const quantity = 1;

  console.log("cart id = ", cart_id);

  const cart = await Cart.findOne({
    _id: cart_id,
  });

  console.log("cart");
  if (cart) {
    {
      if (cart.quantity >= quantity) {
        cart.quantity -= quantity;
      } else {
        cart.delete();
      }
    }
    return res.send("<h2>Removed From Cart</h2>");
  }
};

// Add to cart
const addTocart = async (req, res) => {
  const product_id = req.params.id;
  const user_id = 1;
  const quantity = 1;

  const cart = await Cart.findOne({ user_id: user_id, product_id: product_id });

  if (cart) {
    cart.quantity += quantity;
    await cart.save();
  } else {
    const newCart = new Cart({
      user_id: user_id,
      product: product_id,
      quantity: quantity,
    });
    await newCart.save();
  }
  return res.send("Added to cart.");
};

// upload image
const uploadImage = async (req, res) => {
  path = req.file.path;
  const id = req.params.id;
  console.log("id:", id);
  const product = await Product.findOne({ _id: id });
  console.log("product:", product);
  product.image = path;
  await product.save();

  return res.send("req.file");
};

module.exports = {
  products,
  addProduct,
  ListProducts,
  UpdateProduct,
  DeleteProduct,
  FilterProduct,
  uploadImage,
  addTocart,
  removeFromcart,
  ListCartItems,
};
