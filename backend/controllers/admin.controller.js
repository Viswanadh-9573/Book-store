import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check against environment variables for admin credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { admin: true, email: email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 *1000,
      });

      return res.status(200).json({ token, message: "Admin login successful", success: true });
    } else {
      return res.status(401).json({ message: "Invalid admin credentials", success: false });
    }
  } catch (err) {
    console.error("Error during admin login:", err);
    return res.status(500).json({ message: "Internal server error" });

  }
};

export const checkAuth = async (req,res) => {
    try {
        if (!req.admin || !req.admin.admin) {
            return res.status(403).json({ message: "Admin access required", success: false });
        }
        res.status(200).json({ message: "Admin is authenticated", success: true });
    } catch (error) {
        console.error("Error during auth check:", error);
        return res.status(500).json({ message: "Internal server error",success:false });
    }

}

export const adminLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.status(200).json({message:"Admin logout successful", success:true});
    } catch (error) {
        console.error("Error during admin logout:", error);
        return res.status(500).json({ message: "Internal server error",success:false });
    }
}
     
