import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import Sidebar from "../../components/admin/Sidebar";

const Layout = () => {
  // define navigate, to navigate to admin page
  const navigate = useNavigate();

  // handle logout
  const logout = async () => {
    navigate("/");
  };
  return (
    <div className="">
      <div className=" max-w-[1560px] mx-auto flex items-center cursor-pointer justify-between py-2 h-[70px] px-4 sm:px24 border-b border-gray-100">
        {/* logo */}
        <img
          onClick={() => navigate("/")}
          className="w-28 sm:w-44"
          src={assets.logo}
          alt="logo"
        />
        {/* login button */}
        <button
          onClick={logout}
          className="flex cursor-pointer items-center gap-3 px-6 sm:px-10 py-2 text-white rounded-full bg-primary"
        >
          Logout
          <img src={assets.arrow} className="w-3" alt="" />
        </button>
      </div>
      {/* main section */}
      <div className="flex justify-between  max-w-[1560px] mx-auto">
        {/* sidebar */}
        <Sidebar />
        {/* outlet */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
