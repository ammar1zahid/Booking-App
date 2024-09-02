const express = require("express");
const {

  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} =require("../controllers/hotel") ;
const Hotel = require("../models/Hotel");
const { verifyToken , verifyUser ,verifyAdmin } = require("../utilis/verifyToken");

const hostelRouter = express.Router();


//CREATE
hostelRouter.post("/",verifyAdmin, createHotel);


//UPDATE
hostelRouter.put("/:id",verifyAdmin, updateHotel);


//DELETE
hostelRouter.delete("/:id",verifyAdmin, deleteHotel);


//GET

hostelRouter.get("/find/:id", getHotel);

//GET ALL

hostelRouter.get("/", getHotels);

module.exports = hostelRouter
