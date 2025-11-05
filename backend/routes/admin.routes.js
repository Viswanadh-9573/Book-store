import express from "express";
const adminRouter = express.Router();
import {adminLogin} from "../controllers/admin.controller.js";
import {checkAuth} from "../controllers/admin.controller.js";
import {adminLogout} from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/authAdmin.js";

adminRouter.post("/login",adminLogin);
adminRouter.get("/check-auth",authAdmin,checkAuth);
adminRouter.get("/logout",authAdmin,adminLogout);

export default adminRouter;
