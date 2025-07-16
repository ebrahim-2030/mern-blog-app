// import flowbite components
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
const DashSidebar = () => {
  // get current location object from react-router
  const location = useLocation();
  // state to track active tab
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // get current location object from react-router
    const urlParams = new URLSearchParams(location.search);
    // get the value of the 'tab' parameter
    const tabFromUrl = urlParams.get("tab");
    // if 'tab' exists in the URL, update the state
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // handle user signout
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const date = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Sidebar aria-label="Default sidebar example" className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <SidebarItem
              href="#"
              active={tab === "profile"}
              icon={HiUser}
              label="user"
              labelColor="dark"
              as={"div"}
            >
              Profile
            </SidebarItem>
          </Link>

          <SidebarItem onClick={handleSignout} href="#" icon={HiArrowSmRight}>
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSidebar;
