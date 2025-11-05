import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="my-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-b from-cyan-100/90">
      {/* Image Section */}
      <div className="relative">
        {/* Main image */}
        <img src={assets.hero_girl} alt="" />
        {/* Absolute positioned image for larger screens */}
        <div className="hidden md:block absolute top-20 -right-40">
          <img src={assets.hero_book} alt="" />
        </div>
      </div>

      {/* Text and Buttons Section */}
      <div>
        <h1 className="text-2xl md:text-5xl font-bold text-gray-800">
          Discover Your Next <br />
          <span className="text-primary">Favorite Book</span>
        </h1>

        <div className="my-10 flex flex-col md:flex-row gap-5 md:gap-10">
          {/* Shop Now Button */}
          <button
            onClick={() => {
              navigate("/books");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white rounded-full px-10 py-2 cursor-pointer" style={{ backgroundColor: '#111e5c' }}
          >
            Shop Now
          </button>

          {/* Explore Now Button */}
          <button className="bg-white text-primary border border-primary rounded-full px-10 py-2 cursor-pointer">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;