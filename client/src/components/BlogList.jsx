import { motion } from "motion/react";
import { useState } from "react";
import { blogCategories } from "../assets/assets";
import BlogCard from "../components/BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  // state for blog category
  const [blogCategory, setBlogCategory] = useState("All");
  // state for blogs
  // const [blogs, setBlogs] = useState(blog_data);
  const { blogs, input, loading } = useAppContext();

  // filter blogs, based on blog category
  const fileredBlogs = blogs.filter((blog) => {
    const matchCtg =
      blogCategory === "All" ||
      blogCategory.toLowerCase() === blog.category.toLowerCase();
    const matchInput = blog.title.toLowerCase().includes(input.toLowerCase());
    return matchCtg && matchInput;
  });

  return (
    // blog list container
    <div>
      {/* blog categories */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => {
          return (
            <div key={item} className="relative ">
              <button
                onClick={() => setBlogCategory(item)}
                className={`cursor-pointer text-gray-500 ${
                  blogCategory === item && "text-white px-4 pt-0.5"
                }`}
              >
                {item}
                {item === blogCategory && (
                  <motion.div
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-0 left-0 right-0 w-full h-7  bg-primary -z-1 rounded-full"
                  ></motion.div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* blog cards */}
      {loading ? (
        <h1 className="w-full text-center text-primary/70">Loading . . . </h1>
      ) : fileredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mt-8  sm:mx-16 xl:mx-40">
          {fileredBlogs.map((blog) => {
            return <BlogCard key={blog._id} blog={blog} />;
          })}
        </div>
      ) : (
        <h1 className="w-full text-center text-primary/70">No Blogs Found!</h1>
      )}
    </div>
  );
};

export default BlogList;
