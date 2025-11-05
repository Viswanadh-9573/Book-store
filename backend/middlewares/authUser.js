import jwt from "jsonwebtoken";
export const authUser =(req,res,next)=>{

  try{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized: No token provided" ,success:false});
    }

     const decoded = jwt.verify(token,process.env.JWT_SECRET);
     req.user = decoded;
     next();
  }
  catch(err){
    console.error("Error in authUser middleware:", err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({message:"Invalid token", success:false});
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({message:"Token expired", success:false});
    } else {
      return res.status(500).json({message:"Internal server error", success:false});
    }
  }
}

