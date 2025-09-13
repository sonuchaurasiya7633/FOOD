import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass:process.env.PASS ,
  },
});


export const sendOtpMail = async(to,otp)=>{
  await transporter.sendMail({
   from:process.env.EMAIL,
   to,
   subject:"Reset Your Password",
   html:`<p>Your Otp for password rest is <b>${otp}</b>. It expires in 5 minutes. </p>`
  })
}