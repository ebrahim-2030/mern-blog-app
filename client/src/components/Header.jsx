// import components from flowbite-react
import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";

// import routing hooks and components
import { Link, useLocation } from "react-router-dom";

// import icons from react-icons
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
   // get current path for active link styling
  const path = useLocation().pathname;
  return (
    <Navbar className="bg-white border-b-2 ">

      {/* logo */}
      <Link
        to={"/"}
        className=" self-center  text-sm sm:text-lg font-semibold   px-4 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-tl-full rounded-br-full  "
      >
        <span className="">Tech</span>
        Blogs
      </Link>
      {/* search input form */}
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      {/* right side buttons */}
      <div className="flex gap-3 sm:order-2">
        <button className="border  w-10 h-10 flex justify-center items-center rounded-full text-gray-500">
          <AiOutlineSearch size="20" />
        </button>
        <button className="border  w-10 h-10 flex justify-center items-center rounded-full text-gray-500">
          <FaMoon size="20" />
        </button>
        <Link to={"/signin"}>
          <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
            SignIn
          </Button>
        </Link>
        <NavbarToggle></NavbarToggle>
      </div>

      {/* collapsible navbar links */}
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path === "/"}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/about" active={path === "/about"}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/projects" active={path === "/project"}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
