import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator";



//loginuser

const loginUser=async(req,res)=>{

    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"user doesnt exist"});
    }
    
    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.json({success:false, message:"invalid credentials"})
       
    }

    //if user exist and password match then create token and send it to the user
    const token=createToken(user._id);
        res.json({success:true,token});



}catch(error){
    console.log(error);
    res.json({success:false, message:error})
}

}

//creation of token
// function to create a token
const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}



//register user
const registerUser= async(req,res)=>{
const {name,email,password}=req.body;
try{
    const exist=await userModel.findOne({email});
    if(exist){
        return res.json({success:false, message:"user alreday exist"})
    }
    //validating email format and string password
    if((!validator.isEmail(email))){
        return res.json({success:false,message:"please enter a valid email"})
    }
    if(password.length<8){
        return res.json({success:"please enter strong password"});
    }

    //incrypt
    // hashing user password 

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const newUser=await new userModel({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    const user=await newUser.save();

//taken user id and passed to create token function for creating token for particular user
    const token=createToken(user._id);
    res.json({success:true,token })



}
catch(error){
console.log(error);
res.json({success:false,message:error})
}
}


export {loginUser,registerUser};