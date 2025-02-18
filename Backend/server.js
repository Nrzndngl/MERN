const express = require("express");
const app = express();

const connectDb = require("./Database/database");
// connect to database
connectDb();

// import router
const userRouter = require("./router/user_router");
const productRouter = require("./router/product_router");

// view engine setup
app.set("view engine", "hbs");

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/login", userRouter);
app.listen(3000);
console.log("Server is running on port 3000");
