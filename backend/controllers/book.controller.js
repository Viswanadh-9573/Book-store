import Book from "../models/books.model.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return   res.status(200).json({
            success: true,
            books,
        }); ;
    } catch (error) {   
        console.error("Error fetching books:", error);
       return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const   addBook = async (req, res) => {
    try {
        const { title, author, price, offerPrice, rating, reviews, description, category } = req.body;
        if(!title || !author || !price || !offerPrice || !description || !category ) {
            return  res.status(400).json({ message: "All fields are required except rating and reviews" });
        }       
         const image =req.file.filename;
         const book = await Book.create({
            title,
            author,
            price,
            offerPrice,
            rating: rating || 0,
            reviews: reviews || 0,
            description,
            category,
            image,
        });
       return  res.status(201).json({
          success: true,    
          book,
          message: "Book added successfully",
       });     
    } catch (error) {
        console.error("Error adding book:", error);
       return res.status(500).json({ message: "Server Error", error: error.message , success: false});
    }
};                               