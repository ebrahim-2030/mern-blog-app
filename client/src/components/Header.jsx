// import components from flowbite-react
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
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
import { useSelector } from "react-redux";
import { HiLogout } from "react-icons/hi";
import { TiUser } from "react-icons/ti";

const Header = () => {
  // get current path for active link styling
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Navbar className="bg-white border-b-2 ">
      {/* logo */}
      <Link
        to={"/"}
        className=" self-center  text-sm sm:text-lg font-semibold   pl-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-l-full font-mono   "
      >
        <span className="mr-1">Tech</span>
        <span className="bg-white text-purple-500 rounded-l-full px-4">
          Blogs
        </span>
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
        <button className="border  w-10 h-10 rounded-full text-gray-500 hidden sm:flex justify-center items-center ">
          <FaMoon size="20" />
        </button>
        {currentUser ? (
          <Dropdown
            className="p-0 bg-white hover:bg-white"
            arrowIcon={false}
            label={
              <Avatar
                img={currentUser.profilePicture}
                alt="user avatar"
                rounded
              />
            }
          >
            <DropdownHeader className="">
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </DropdownHeader>
            <DropdownDivider />

            <Link to={"/dashboard/?tab=profile"}>
              <DropdownItem icon={TiUser}>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem icon={HiLogout}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to={"/signin"}>
            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
              SignIn
            </Button>
          </Link>
        )}
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
