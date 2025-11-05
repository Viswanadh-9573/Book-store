import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const BookCard = ({ book }) => {
  const {addToCart}= useContext(AppContext);
  return (
    <div className="p-4 shadow-md rounded-lg bg-white">
      {/* Book Image with Link */}
      <Link to={`/book/${book._id}`}>
        <img
           src={`${import.meta.env.VITE_API_BASE_URL}/images/${book.image}`}
          alt={book.title}
          className="w-[255px] h-[350px] object-cover rounded-md transition-all duration-300 hover:scale-105"
        />
      </Link>

      {/* Rating and Reviews */}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-2">
        <IoMdStar  className="w-4 h-4" />
          <p>{book.rating}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>{book.reviews}</p>
          <p>Reviews</p>
        </div>
      </div>

      {/* Author and Title */}
      <p className="text-sm text-gray-500">Author: {book.author}</p>
      <h3 className="text-lg font-semibold mt-1">{book.title}</h3>

      {/* Price */}
      <div className="flex items-center gap-5 mt-2">
        <p className="text-gray-400 line-through">${book.price}</p>
        <p className="text-gray-800 font-medium">${book.offerPrice}</p>
      </div>

      {/* Add to Cart Button */}
      <button onClick={() => addToCart(book)}  className="text-white rounded-full px-10 py-2 cursor-pointer mt-4 transition" style={{ backgroundColor: '#111e5c' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#111e5c90'} onMouseLeave={(e) => e.target.style.backgroundColor = '#111e5c'}>
        Add To Cart
      </button>
    </div>
  );
};

export default BookCard;
