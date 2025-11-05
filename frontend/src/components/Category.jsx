import { useContext } from "react";
import { categories } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Category = () => {
  const{setSelectedCategory,navigate}=useContext(AppContext);
  const handleCategory=(name)=>{
    setSelectedCategory(name);
    navigate("/books");

  }
  return (
    <div className="my-16">
      <h1 className="text-2xl md:text-5xl font-bold text-gray-800">
        Shop by Category
      </h1>
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 items-center justify-center">
        {categories.map((category) => (
          <div onClick={()=>{handleCategory(category.name);
            window.scrollTo({ top:0,behavior:"smooth"  });
          }}
            key={category._id}
            className="flex flex-col items-center border border-gray-300 rounded-lg transition-all hover:scale-105 p-3 cursor-pointer"
          >
            <img src={category.image} alt="" />
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;