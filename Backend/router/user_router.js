const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user_controller");

router.post("/signup", userController.signup);

//router.get("/login", userController.login);

router.get("/profile/:username", userController.profile);

router.post("/login", userController.login);

router.delete("/delete/:username", userController.deleteUser);

router.patch("/");

module.exports = router;
