import User from  "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000, 
};

export const signUp = async(req,res)=>{
   try{ 
    const {name,email,password} = req.body;
     
     if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
     }
     
     const existingUser = await User.findOne({email});
     if(existingUser){
        return res.status(409).json({message:"User with this email already exists"});
     }
     
     const hashedPassword = await bcrypt.hash(password,10);
     
     const newUser = new User({
        name,
        email,
        password:hashedPassword,
     });
     await newUser.save();
     
     const token = jwt.sign(
        {userId:newUser._id,email:newUser.email},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
     );
     
     res.cookie("token", token, cookieOptions);
     
     return res.status(201).json({token,message:"User registered successfully",success:true,user:{id:newUser._id,name:newUser.name,email:newUser.email}});
   }
   catch(err){
    console.error("Error during user sign-up:", err);
    return res.status(500).json({message:"Internal server error"});
   }
}

export const login = async(req,res)=>{
   try{
    const {email,password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});
    }
    
    const user = await User.findOne({email});
    
    if(!user){
        return res.status(401).json({message:"Invalid email or password", success:false});
    }
    
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid email or password", success:false});
    }
    
    const token = jwt.sign(
        {userId:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
     );
     
     res.cookie("token", token, cookieOptions);

     return res.status(200).json({token,message:"Login successful",success:true,user:{id:user._id,name:user.name,email:user.email}});
   }
   catch(err){
    console.error("Error during user login:", err);
    return res.status(500).json({message:"Internal server error"});
   }
}

export const logoutUser = async (req, res) => {
  try{
     res.cookie("token", "", { ...cookieOptions, maxAge: 0 });

     return res.status(200).json({message:"Logout successful" , success:true});
  }
  catch(err){
    console.error("Error during user logout:", err);
    return res.status(500).json({message:"Internal server error"});
  }
};

export const checkAuth= async(req,res)=>{   
    try{
        const userId = req.user.userId; 
        
        const user = await User.findById(userId).select("-password"); 
         
         if(!user){  
            return res.status(404).json({message:"User not found", success:false}); 
         }       
         
         return res.status(200).json({message:"User authenticated", success:true,user});                      
} catch(err){
    console.error("Error during auth check:", err);
    return res.status(500).json({message:"Internal server error"});
   }            
}