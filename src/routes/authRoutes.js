const express = require("express");
const authRouter = express.Router();
const { login, changePassword } = require("../controllers/authController");

authRouter.post("/login", login);
authRouter.post("/change-password", changePassword);
// logout do this
authRouter.post("/logout", logout);

module.exports = authRouter;
