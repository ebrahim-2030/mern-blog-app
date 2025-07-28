import { useEffect, useState } from "react";

import BlogTableItem from "../../components/admin/BlogTableItem";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ListBlog = () => {
  // state for blogs
  const [blogs, setBlogs] = useState([]);

  // get axios instance from app context
  const { axios } = useAppContext();

  // fetch all blogs from blog api
  const fetchBlogs = async () => {
    try {
      const { data } = await axios("/api/admin/blogs");

      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (err) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        toast.error(err.message);
        console.log(err);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="mb-4 text-zinc-800 font-medium">All Blogs</h1>
      <div className="relative max-w-4xl h-4/5 overflow-y-auto bg-white px-4 shadow rounded-lg  ">
        <table className="w-full text-sm text-zinc-500">
          <thead className="text-xs text-zinc-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              return (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  index={index + 1}
                  fetchBlogs={fetchBlogs}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
