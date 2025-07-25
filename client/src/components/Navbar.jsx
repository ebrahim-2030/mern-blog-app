import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  // define navigate, to navigate to admin page
  const navigate = useNavigate();
  return (
    // navbar
    <div className="flex items-center cursor-pointer justify-between px-4 sm:px-0 py-5 mx:8 sm:mx-20 xl:mx-32">
      {/* logo */}
      <img
        onClick={() => navigate("/")}
        className="w-28 sm:w-44"
        src={assets.logo}
        alt="logo"
      />
      {/* login button */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-3 px-6 sm:px-10 py-1.5 text-white rounded-full bg-primary"
      >
        Login
        <img src={assets.arrow} className="w-3" alt="" />
      </button>
    </div>
  );
};

export default Navbar;
