import { useEffect, useState } from "react";

import CommentTableItem from "../../components/admin/CommentTableItem";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const Comments = () => {
  // state for comments
  const [comments, setComments] = useState([]);

  // state to trigger comment filter
  const [filter, setFilter] = useState("Not Approved");

  // get axios instance from app context
  const {axios} = useAppContext();

  
  // fetch comments from admin api route
  const fetchComments = async () => {
    try {
      const { data } = await axios("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (err) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        toast.error(err.message);
        console.log(err);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // run fetchComments once on mount
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 min-h-screen bg-blue-50/50">
      <div className="flex flex-wrap justify-between items-center max-w-3xl gap-2">
        <h1>Comments</h1>
        {/* filter buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-primary" : "text-zinc-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved" ? "text-primary" : "text-zinc-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* comments table */}
      <div className="relative h-4/5 max-w-3xl overflow-y-auto mt-4 bg-white rounded-2xl shadow ">
        <table className="w-full text-sm text-zinc-500">
          <thead className="text-xs text-zinc-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={index}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
