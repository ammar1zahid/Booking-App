const jwt = require("jsonwebtoken")
const createError= require("../utilis/error")


const verifyToken = async (req, res,next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
  
    //verifying token
    jwt.verify(token, "key", (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user; //if no error 
      next();
    });
};

const verifyUser = async (req, res,next) => {
    verifyToken(req, res,  () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
    
          next();
        } else {
          return next(createError(403, "You are not authorized!"));
        }
      });
};

const verifyAdmin = async (req, res,next) => {
    verifyToken(req, res,  () => {
        if ( req.user.isAdmin) {
    
          next();
        } else {
          return next(createError(403, "You are not authorized!"));
        }
      });
};



module.exports={verifyToken , verifyUser, verifyAdmin};