import React from "react";
import { assets } from "../../assets/assets";

const CommentTableItem = ({ comment, index, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogData = new Date(createdAt);
  return (
    <tr className="border-y border-zinc-300">
      <td className="px-6 py-4">
        <b className="font-medium text-zinc-600">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-zinc-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-zinc-600">Comment</b> : {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">{BlogData.toDateString()}</td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt=""
            />
          ) : (
            <p className="text-xs border border-green-500 bg-green-100 text-green-500 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img
            src={assets.bin_icon}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            alt=""
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
