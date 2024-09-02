const express = require("express");
const { CreateUser,LoginUser} = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", CreateUser);
authRouter.post("/login", LoginUser);

module.exports = authRouter;