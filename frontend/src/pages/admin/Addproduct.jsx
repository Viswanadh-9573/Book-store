import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets, categories } from "../../assets/assets";

const AddProduct = () => {
  const { navigate, axios } = useContext(AppContext);
  const [file, setFile] = useState(null);

  const [bookData, setBookData] = useState({
    title: "", // Corresponds to Book Name
    author: "", // Corresponds to Book Author (added)
    price: "",
    offerPrice: "",
    rating: "",
    reviews: "",
    description: "", // Corresponds to Book Description
    category: "",
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
         const formData = new FormData();
          formData.append("image", file); 
          formData.append("title", bookData.title);
          formData.append("author", bookData.author);
          formData.append("price", bookData.price);
          formData.append("offerPrice", bookData.offerPrice);
          formData.append("rating", bookData.rating);
          formData.append("reviews", bookData.reviews);
          formData.append("description", bookData.description);
          formData.append("category", bookData.category);

         const {data} = await axios.post("/book/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
         });
         if(data.success){
            toast.success("Book added successfully");
            navigate("/admin");
         } else {
            toast.error(data.message || "Failed to add book");
         }    

      } catch (error) {
         toast.error(error.message || "Failed to add book");
      }
  };

  
  return (
    // Updated container: removed flex-col justify-between for better alignment control
    <div className="py-10 bg-white"> 
      <form
        onSubmit={handleSubmit}
        // KEY CHANGE 1: Increased max-width and removed mx-auto for left alignment
        className="md:p-10 p-4 space-y-5 max-w-4xl" 
      >
        {/* --- Image Upload (Book Image) --- */}
        <div>
          <p className="text-base font-medium mb-2">Book Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <input
              accept="image/*"
              type="file"
              id="image"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              className="max-w-24 cursor-pointer border rounded"
              src={file ? URL.createObjectURL(file) : assets.upload_area}
              alt="uploadArea"
              width={100}
              height={100}
            />
          </label>
        </div>

        {/* --- Book Name --- */}
        {/* KEY CHANGE 2: Used w-full to make the input area wider */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-base font-medium" htmlFor="title">
            Book Name
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* --- Book Author --- */}
        {/* KEY CHANGE 2: Used w-full to make the input area wider */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-base font-medium" htmlFor="author">
            Book Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* --- Book Description --- */}
        {/* KEY CHANGE 2: Used w-full to make the input area wider */}
        <div className="flex flex-col gap-1 w-full">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Book Description
          </label>
          <textarea
            id="product-description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        {/* --- Category --- */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={bookData.category}
            onChange={handleChange}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- Prices (Product Price & Offer Price) --- */}
        {/* The inputs inside here remain flex-1 for equal width distribution */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 min-w-[150px]">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 min-w-[150px]">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              name="offerPrice"
              value={bookData.offerPrice}
              onChange={handleChange}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        {/* --- Rating & Review --- */}
        {/* The inputs inside here remain flex-1 for equal width distribution */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 min-w-[150px]">
            <label className="text-base font-medium" htmlFor="rating">
              Rating
            </label>
            <input
              id="rating"
              type="number"
              name="rating"
              value={bookData.rating}
              onChange={handleChange}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 min-w-[150px]">
            <label className="text-base font-medium" htmlFor="reviews">
              Review
            </label>
            <input
              id="reviews"
              type="text"
              name="reviews"
              value={bookData.reviews}
              onChange={handleChange}
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        {/* --- Submit Button --- */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;