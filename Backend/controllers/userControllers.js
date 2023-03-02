const asyncHandler= require("express-async-handler");
const User= require("../models/userModel");
const generateToken = require("../util/generateToken");




const registerUser= asyncHandler(async(req,res)=>{

    const {name,email,password,mobile}= req.body;

console.log(name,email);



const userExists=await User.findOne({email});

if(userExists){
    res.status(400);
    throw new Error ("user already exists")
}

const user=await User.create({
    name,
    email,
    password,
    pic,
});


console.log("user::",user)

if(user){
    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        isAdmin:user.isAdmin,
          token:generateToken(user._id),
    })
}

else{

    res.status(400)

    throw new Error("error occured")
}

})