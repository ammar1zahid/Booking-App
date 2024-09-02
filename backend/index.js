const express = require('express');
const app = express();
//const MongoDB = require("./connect");
require('dotenv').config(); 
const mongoose = require('mongoose');
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const hotelsRoutes = require("./routes/hotelsRoutes");
const cookieParser = require("cookie-parser");
const { verifyToken } = require('./utilis/verifyToken');


const port=5000;

// MongoDB()

const connect = async () => {
    try {
      await mongoose.connect(process.env.MongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected");
    } catch (err) {
      console.log("Error:", err);
    }
  }

  //listen our problem
  mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected")
  })
  mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected")
  })

// Configuring CORS options
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };


// Applying CORS middleware to the app
app.use(cors(corsOptions));




//middlewares

//for storing in cookies
app.use(cookieParser())
// Parsing JSON in request body
app.use(express.json());

 app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/hotels", hotelsRoutes);

// Starting the server on the specified port
app.listen(port, ()=>{
    connect()
    console.log(`Backend running on port ${port}`)
})