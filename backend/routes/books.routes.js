import express from "express";
import { addBook, getAllBooks } from "../controllers/book.controller.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import {upload} from "../config/multer.js";
const bookRouter = express.Router();
bookRouter.post("/add", authAdmin , upload.single("image")  ,addBook);
bookRouter.get("/get-books", getAllBooks);

 export default bookRouter;