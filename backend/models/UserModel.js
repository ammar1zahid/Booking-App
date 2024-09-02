const mongoose = require('mongoose')

//schema for users collection in db
const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    } ,
    email: {
        type: String,
        required: true
    } ,
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false // Setting the default value of isAdmin to false
    } 
})
 
const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel