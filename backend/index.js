
import express from "express";
import cors from  "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import userRouter from "./routes/user.router.js";
import adminRouter from "./routes/admin.routes.js";
import bookRouter from "./routes/books.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import addressRouter from "./routes/address.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// middlewares
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static("uploads"));

  app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
  });
 app.use("/user",userRouter);
 app.use("/admin",adminRouter);
 app.use("/book",bookRouter);
 app.use("/cart",cartRouter);
 app.use("/order",orderRouter);
 app.use("/address",addressRouter);
 
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });



