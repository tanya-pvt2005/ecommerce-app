//those api where we need admin priviledges
import jwt from "jsonwebtoken";

const adminAuth = async(req, res, next)=>{
    try{
        const {token} = req.headers
        console.log(token)
        if(!token){
            return res.json({success : false, message:"No token generated, Login Again"})
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        //we created a string using email and password
        if(tokenDecode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success : false, message:"Not Authorized, Login Again"})
        }
        next()
    }catch(error){
        console.log(error)
        return res.json({success : false, message:error.message})
    }
}

export default adminAuth