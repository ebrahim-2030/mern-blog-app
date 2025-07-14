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

const DashSidebar = () => {
  // get current location object from react-router
  const location = useLocation();
  // state to track active tab
  const [tab, setTab] = useState("");

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
            >
              Prifile
            </SidebarItem>
          </Link>

          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSidebar;
