import React, { useContext, useState } from 'react';
import { categories } from "../assets/assets";
import { AppContext } from '../context/AppContext';

const Search = () => {
  const{setSearchQuery , navigate}=useContext(AppContext);
  const [input , setInput]= useState("");
  const handleSearch =(e)=>{
    e.preventDefault();
    setSearchQuery(input);
    navigate("/books");
  }
  return (
    <div className="my-16 rounded-lg shadow-md bg-white h-[400px] flex flex-col 
      items-center justify-center bg-gradient-to-b from-purple-200/80">
      
      <form onSubmit={handleSearch} className="max-w-4xl w-full mx-auto flex justify-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search book ..."
          className="w-1/2 outline-none border border-gray-300 py-4 text-center "
        />
        <button
          type="submit"
          className="py-4 px-12 text-white border rounded-r-full cursor-pointer" style={{ backgroundColor: '#111e5c' }}
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-6 mt-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className="w-[116px] flex flex-col items-center justify-center  bg-gray-100 border-gray-300 rounded-md cursor-pointer p-3"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 object-cover"
            />
            <p className="mt-2 text-sm text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
