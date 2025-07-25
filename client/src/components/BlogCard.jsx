import { time } from "motion/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
    // destructuring blog
  const { title, description, category, image, _id } = blog;

  // define navigate, to navigate to blog
  const navigate = useNavigate();

  return (
    // blog card
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-105 hover:shadow-primary/25 duration-500 cursor-pointer"
    >
        {/* blog image */}
      <img src={image} className="aspect-video" alt="" />
      {/* blog category */}
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-sm">
        {category}
      </span>
      {/* blog description */}
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900 ">{title}</h5>
        <p
          className="mb-3 text-xs text-gray-700"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
