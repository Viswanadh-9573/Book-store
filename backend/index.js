
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

const allowedOrigins = [
  "https://bookstore855.netlify.app",
  "https://690ece994a3e6a3ba985e8d1--bookstore855.netlify.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


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



