const Users = require("../models/UserModel")

//update user
const UpdateUser = async (req, res) => {

    try{
        //id pased in params
        const UpdateUser = await Users.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, 
            { new: true });
            //for fecting updated value instead of previous

        res.status(200).json(UpdateUser)

    }
    catch(err){
        //server error
        res.status(500).json(err);
    }
};



//delete user
const DeleteUser = async (req, res) => {
    try{
        //id pased in params
        const DeleteUser = await Users.findByIdAndDelete(req.params.id );      

        res.status(200).json("User has been deleted")

    }
    catch(err){
        //server error
        res.status(500).json(err);
    }
};

//get single user
const GetUser = async (req, res) => {
    try{
        //id pased in params
        const User = await Users.findById(req.params.id );      
          

        res.status(200).json(User)

    }
    catch(err){
         //server error
         res.status(500).json(err);
    }
};


//get all users
const AllUsers = async (req, res,next) => {
    try{
        
        const AllUsers = await Users.find();      
        // const AllUsers = await Users.findById("jdsjfsdj");      
 
        res.status(200).json(AllUsers)

    }
    catch(err){
        //calling error middleware
        next(err)
    }
};





    module.exports = { UpdateUser, DeleteUser,AllUsers , GetUser };