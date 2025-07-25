import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    // header
    <div className=" sm:mx-20 xl:mx-32  relative">
      <div className="text-center mt-20 mb-10">
        {/* new */}
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5  mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI Feature Intergrated</p>
          <img src={assets.star_icon} className="w-2.5" alt="" />
        </div>

        {/* heading */}
        <h1 className="my-2 text-3xl  sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary">bloggin</span> <br />{" "}
          plateform.
        </h1>
        {/* description */}
        <p className="my-6 sm-my-8 max-w-2xl mx-auto max-sm:xs text-gray-500">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>

        {/* search form */}
        <form className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white overflow-hidden rounded">
          <input type="text" required className="w-full pl-4 outline-none" />
          <button className="bg-primary text-white px-8 py-2 m-1.5  rounded hover:scale-105 transition-all cursor-pointer">
            submit
          </button>
        </form>
      </div>
      {/* gradinet background */}
      <img
        src={assets.gradientBackground}
        className="absolute inset-0 -top-52 -z-10 opacity-50"
        alt=""
      />
    </div>
  );
};

export default Header;
