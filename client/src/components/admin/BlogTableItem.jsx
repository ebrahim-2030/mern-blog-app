import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  // destructure blog data
  const { title, createdAt } = blog;

  // format blog date
  const BlogDate = new Date(createdAt);

  // get axios instance from app context
  const { axios } = useAppContext();

  // handle delete blog
  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you wanna delete this blog?");
    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/blog/delete", {
        blogId: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        toast.error(err.message);
        console.log(err);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // handle publish blog
  const togglePublished = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        blogId: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        toast.error(err.message);
        console.log(err);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <tr className="border-y border-zinc-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-500" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="flex text-xs gap-3 px-2 py-4 flex-col items-center lg:flex-row  ">
        <button onClick={togglePublished} className="border w-24 py-0.5 mt-1 rounded cursor-pointer">
          {" "}
          {blog.isPublished ? "Unpoblished" : "Published"}{" "}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt=""
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
