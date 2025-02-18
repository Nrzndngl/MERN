const User = require("../models/user-models");
const bcrypt = require("bcrypt");
// const login = (req, res) => {
//   res.send("Hello from login page.");
// };
const signup = async (req, res) => {
  console.log("Body =", req.body);
  const username = req.body.username;
  const password = req.body.password;
  const phone = req.body.phone;

  // has thw password
  const saltrounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltrounds);

  await User.create({
    username: username,
    password: hashedPassword,
    phone: phone,
  });
  res.send("User created successfully.");

  //res.send(req.body);
};

const login = async (req, res) => {
  console.log("Body =", req.body);

  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return res.status(400).json({ message: "Error credentials" });
  }
  console.log("User =", user.password);
  console.log("Password =", req.body.password);

  const matchedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  console.log("here");
  if (!matchedPassword) {
    return res.status(200).send({ message: "Error credentials" });
  }
  res.status(400).send({ message: "Login Successful" });
};

const profile = async (req, res) => {
  try {
    console.log("parameters =", req.params);

    const existing = await User.findOne({
      username: req.params.username,
    }).select("username phone");
    if (!existing) {
      return;
      res.status(400).send({
        message: "User not found",
      });
      res.status(200).json({
        message: "User found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error getting user profile",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("parameters =", req.params);

    const existing = await User.findOne({
      username: req.params.username,
    });
    if (!existing) {
      return res.status(400).send({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
    });
  }
};

module.exports = { login, signup, profile, deleteUser };
