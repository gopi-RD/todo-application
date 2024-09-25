
const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken");
const dotEnv=require("dotenv")


dotEnv.config()

const secretKey=process.env.secret_key



const userRegisteration=async(request,response)=>{
    const {username,email,password}=request.body

    try{
        const userEmail= await User.findOne({email});
        if (userEmail){
            console.log("user alredy exists")
            return response.status(401).json({error_msg:"Email Already Exists!"});
           
           
        }
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser=new User({
                username,
                email,
                password:hashedPassword
            })
            await newUser.save();
            response.status(201).json({message:"User Successfully Registered "});
            console.log("registered")
     
        

    }catch(error){
        response.status(500).json({error_msg:`Internal server Error is ${error}`})
    }
}

const userLogin=async(request,response)=>{
    const {email,password}=request.body 
    try{
        const userDetails= await User.findOne({email})
        if (!userDetails){
           return response.status(400).json({error_msg:"Invalid User Email"})
       }else{
           isPasswordMatch=await bcrypt.compare(password,userDetails.password);
           if (isPasswordMatch===true){
               const payload={user_id:userDetails._id}
               const jwtToken=await jwt.sign(payload,secretKey,{expiresIn:"3h"})
               response.status(200).json({message:"Login Successfully",jwtToken})
           }else{
               response.status(400).json({error_msg:"Invalid Password"})
           }
           
        }
      

    }catch(error){
        response.status(500).json({error_msg:`Internal server Error is ${error}`})
    }
    }
    const getAllUsers=async(request,response)=>{
        try{
            const users=await User.find().populate("todos")
            response.json(users)
        }catch(error){
            response.status(500).json({error_msg:`Internal server Error is ${error}`})
        }
}

const getUser=async(request,response)=>{
    const {userId}=request.params 
    try {
        const user=await User.findById(userId).populate("todos")
        if (!user){
            response.status(404).json({error_msg:"User Not Found"})
        }
        
        response.status(200).json(user)
    } catch (error) {
        response.status(500).json({error_msg:`Internal server Error is ${error}`})
    }
} 

const userProfile=async (request,response) => {
    const {user_id}=request
    try{
        const user=await User.findById(user_id)
        console.log("get user profile")
        if (!user){
            return res.status(404).json({error_msg:"User Not Found"})
        }
        response.status(200).json(user)

    }
    catch (error) {
        response.status(500).json({error_msg:`Internal server Error is ${error}`})
    }
}

module.exports={userRegisteration,userLogin,getAllUsers,getUser,userProfile};