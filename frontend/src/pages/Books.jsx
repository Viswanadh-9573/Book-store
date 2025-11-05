import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BookCard from "../components/BookCard";

const Books = () => {
  const { booksData,searchQuery,selectedCategory } = useContext(AppContext);
  const filterBooks = (booksData ?? []).filter((book) => {
    const title = (book?.title ?? "").toLowerCase();
    const query = (searchQuery ?? "").toLowerCase();
    const matchSearch = title.includes(query);
  
    const matchCategory = selectedCategory
      ? (book?.category ?? "").toLowerCase() === selectedCategory.toLowerCase()
      : true;
  
    return matchSearch && matchCategory;
  });
  
  return (
    <div>
      <h1 className="text-2xl md:text-5xl font-bold text-gray-800">
        All Books
      </h1>
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filterBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
