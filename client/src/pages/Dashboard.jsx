import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {
// get current location object from react-router
const location = useLocation();

// state to track active tab
const [tab, setTab] = useState("");

// run effect when the URL query string changes
useEffect(() => {
  // parse URL parameters
  const urlParams = new URLSearchParams(location.search);

  // get the value of the 'tab' parameter
  const tabFromUrl = urlParams.get("tab");

  // if 'tab' exists in the URL, update the state
  if (tabFromUrl) {
    setTab(tabFromUrl);
  }
}, [location.search]); 

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* sidebare component */}
      <div className="w-56">
        <DashSidebar />
      </div>
     {/* render the profile tab content only when tab equals 'profile' */}
      {tab === "profile" && <DashProfile />}
    </div>
  );
};

export default Dashboard;
