// Description: It has all the routes for the product.
const express = require("express");
const router = express.Router();
const productController = require("../Controllers/product_controller");
const multer = require("multer");
const Product = require("../models/product-models");

// get all products
router.get("/product", productController.products);

// get product by id
router.patch("/product/:id", productController.UpdateProduct);

// delete product
// router.delete("/product/:id", productController.DeleteProduct);

// filter product
router.get("/filter", productController.FilterProduct);

// template to pages
router.get("/product_list", productController.ListProducts);
router.all("/add_product", productController.addProduct);
router.post("/delete_product/:id", productController.DeleteProduct);
router.all("/addtocart/:id", productController.addTocart);
router.all("/listcart", productController.ListCartItems);
router.get("/removefromcart", productController.removeFromcart);

module.exports = router;
