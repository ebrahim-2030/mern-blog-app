import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // get current user from redux store
  const { currentUser } = useSelector((state) => state.user);

  // if user exists, render the nested route, otherwise, redirect to signin
  return currentUser ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
