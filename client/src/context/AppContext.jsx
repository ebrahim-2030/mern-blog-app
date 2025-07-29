import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// create context for the app
const AppContext = createContext();

// set the base url for all axios requests
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // app level states
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch all blogs from server
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // on mound: fetch all blogs from server and set the token fron localstorage
  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);

      // set default authorization header for axios requests
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  // context value to be share
  const value = {
    navigate,
    axios,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// custome hook to use app context
export const useAppContext = () => {
  return useContext(AppContext);
};
