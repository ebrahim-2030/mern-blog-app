import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const CommentTableItem = ({ comment, index, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogData = new Date(createdAt);

  // get axios instance from app context
  const { axios } = useAppContext();

  // handle approve comment
  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
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

  // handle delete comment
  const deleteComment = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this commnet?"
    );
    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/admin/delete-comment", { id: _id });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
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
              onClick={approveComment}
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
            onClick={deleteComment}
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
