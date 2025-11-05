import express from "express";
import { checkAuth, login, logoutUser, signUp } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.js";
const userRouter = express.Router();
userRouter.post("/signUp",signUp);
userRouter.post("/login" ,login);
userRouter.get("/logout", authUser,logoutUser);
userRouter.get("/is-auth",authUser,checkAuth);
export default userRouter;