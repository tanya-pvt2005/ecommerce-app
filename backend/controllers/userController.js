// Helps in creating and logging account

import userModel from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// User Login Route
const loginUser = async(req, res) =>{
     try{
        console.log("Login attempt")
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message:"User does not exists"})

        }

        const isMatch = await bcrypt.compare(password, user.password)

        console.log(isMatch)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true, token})
        }else{
            res.json({success:false, message: 'Invalid Credentials'})
        }

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// Register User route
const registerUser = async(req, res) =>{
    try {
        //get name email pswd
        const {name, email, password} = req.body

        // checking user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success: false, message:"User already exists"})
        }

        //validating email
        if (!validator.isEmail(email)) {
             return res.json({success: false, message:"Please enter valid email"})
        }

          //validating email
        if (password.length<8) {
             return res.json({success: false, message:"Please enter strong password"})
        }

        //create the account by hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save() //_id will be genrated

        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


// admin login
const adminLogin = async(req, res)=>{
   
}

export {loginUser, registerUser, adminLogin}