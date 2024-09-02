const express = require("express");
const { UpdateUser,DeleteUser,AllUsers , GetUser  } = require("../controllers/user");
const { verifyToken , verifyUser ,verifyAdmin } = require("../utilis/verifyToken");


const userRouter = express.Router();


//jwt role based verification

// userRouter.get("/checkAuthentic",verifyToken,(req,res,next)=>{
//      res.send("You're logged in succesfully")
// })

// userRouter.get("/checkUser/:id",verifyUser,(req,res,next)=>{
//      res.send("You're logged in succesfully and you can edit your account")
// })

// userRouter.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
//      res.send("You're logged in succesfully and you can edit your account")
// })


//update user
userRouter.put("/updateUser/:id",verifyUser, UpdateUser);

//delete user
userRouter.delete("/deleteUser/:id",verifyUser, DeleteUser);

//fetch a user
userRouter.get("/getUser/:id",verifyUser, GetUser);

//fetch all users
userRouter.get("/getAllUsers",verifyAdmin, AllUsers);

module.exports = userRouter;