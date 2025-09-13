import User from "../models/user.model.js ";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

 export const signUp = async (req,res) =>{
  try {
    const {fullName,email,password,mobile,role} = req.body;
    let user = await User.findOne({email}) 
    if(user){
      return res.status(400).json({message:"User already exists"})
    } 
    if(password.length < 6){
      return res.status(400).json({message:"Password must be at least 6 characters"})
    }
    if(mobile.length < 10){
      return res.status(400).json({message:"Mobile number must be at least 10 characters"})
    }

     const hashedPassword = await bcrypt.hash(password,10)
     user = await User.create({
      fullName,
      email,
      password:hashedPassword,
      mobile,
      role
     })

     const token =await genToken (user._id)
     res.cookie("token",token,{
      secure:false,
      samSite:"strict",
      maxAge:7*24*60*60*1000,
      httpOnly:true
     })
    
     res.status(201).json(user)

  } catch (error) {
     res.status(500).json(`signup error ${error.message}`)
  }
}

 export const signIn = async (req,res) =>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email}) 
    if(!user){
      return res.status(400).json({message:"User does not exists"})
    } 
    
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({message:"Invalid credentials"})
    }

     const token =await genToken (user._id)
     res.cookie("token",token,{
      secure:false,
      samSite:"strict",
      maxAge:7*24*60*60*1000,
      httpOnly:true
     })
    
     res.status(200).json(user)

  } catch (error) {
     res.status(500).json(`signIn error ${error.message}`)
  }
}

export const signOut = (params) =>{
  try {
    res.clearCookie("token")
    res.status(200).json({message:"Signout successfully"})
  } catch (error) {
    res.status(500).json(`signout error ${error.message}`)
  }
}

export const sendOtp = async(req,res)=>{
  try {
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"User does not exist"})
    }
    const otp = Math.floor(1000+Math.random()* 9000).toString()
    user. resetOtp= otp
    user. otpExpires = Date.now()+5*60*1000
    user.isOtpVerified = false
    await user.save()
    await sendOtpMail(email,otp)
    return res.status(200).json({message:"Otp sent Successfully on registerd email"})
  } catch (error) {
    return res.status(500).json(`send otp error ${error}`)
  }
}

export const verifyOtp =async (req,res) =>{
  try {
    const {email,otp} = req.body
    const user = await User.findOne({email})
    if(!user || user.resetOtp != otp || user.otpExpires<Date.now()){
      return res.status(400).json({message:"Invalid/expired otp"})
    }
    user.isOtpVerified = true
    user.resetOtp = undefined
    user.otpExpires = undefined
    await user.save()
    return res.status(200).json({message:"Otp verify successfully"})
  } catch (error) {
    return res.status(500).json(`verify otp error ${error}`)
  }
}

export const resetPassword =async (req,res)=>{
  try {
    const {email,newPassword} = req.body
    const user = await User.findOne({email})
       if(!user || !user.isOtpVerified){
      return res.status(400).json({message:"otp verification required"})
    }
    const hashedPassword = await bcrypt.hash(newPassword,10)
    user.password=hashedPassword
    user.isOtpVerified=false
    await user.save()
     return res.status(200).json({message:"password reset succesfully"})
  } catch (error) {
     return res.status(500).json(`Reset password  error ${error}`)
  }
}

export const googleAuth =async (req,res) =>{
  try {
    const{fullName,email,mobile,role}= req.body
    let user = await User.findOne({email})
    if(!user){
      user = await User.create({
      fullName,email,mobile,role
    })
    }
    const token = await genToken(user._id)
    res.cookie("token",token,{
      secure:false,
      samSite:"strict",
      maxAge:7*24*60*60*1000,
      httpOnly:true

    })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(`Google Auth  error ${error}`)
  }
}