import express from "express";
import { getCart, updateCart } from "../controllers/cart.controller.js";
import { authUser } from "../middlewares/authUser.js";

const cartRouter = express.Router();

cartRouter.get("/get", authUser, getCart);
cartRouter.put("/update", authUser, updateCart);

export default cartRouter;
