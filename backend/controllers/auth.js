const Users = require("../models/UserModel")
const bycrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")

const createError= require("../utilis/error")

const CreateUser = async (req, res) => {

    try{


        //encrypting password by use of bycrypt
        const salt = bycrypt.genSaltSync(10)
        const hash = bycrypt.hashSync(req.body.password,salt)



        const NewUser = new Users({
            name:req.body.name,
            email:req.body.email,
            password:hash, 

        }) 

        await NewUser.save()

        res.status(200).send("User has been created")

    }
    catch(err){
        //server error
        res.status(500).json(err);
    }
};

// const CreateUser = async (req, res) => {

//     const NewUser = new Users(req.body) 

//     try{
//         const savedUser= await NewUser.save()
//         res.status(200).json(savedUser)

//     }
//     catch(err){
//         //server error
//         res.status(500).json(err);
//     }
// };

const LoginUser = async (req, res,next) => {
    try {     
    
        const user = await Users.findOne({
            name:req.body.name
        })

        // console.log("User found: ",user)

        if(!user) return next(createError(404,"User not found"))

        // console.log("Entered pw: ",req.body.password)
        // console.log("og pw: ",user.password)

        const isPasswordCorrect =await bycrypt.compare(req.body.password,user.password)

        // console.log("compare pw: ",isPasswordCorrect)

        if(!isPasswordCorrect) return next(createError(400,"Wrong password or username"))

        const {password,isAdmin,...otherDetails}=user._doc

        //using jwt token
        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin},"key")


        res.cookie("access_token",token,{
            httpOnly:true, //its doesn't allow client secret to reach this cookie, so more secure
        }).status(200).json({...otherDetails})

    }
    catch(err){
        //server error
        res.status(500).json(err);
    }
};

const GetUser = (req, res) => {
    res.send("this is Get user  api");
};


module.exports = { CreateUser,LoginUser };