import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Moment from "moment";
import Loader from "../components/Loader";

const Blog = () => {
  // get blog id
  const { id } = useParams();
  // state for blog data
  const [data, setData] = useState(null);
  // state for comments
  const [comments, setComments] = useState([]);
  // state for commnet
  const [comment, setComment] = useState({
    name: "",
    email: "",
  });

  // handle change, for comment data
  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  // fetch blog data
  const fetchBlogData = async () => {
    const foundBlog = blog_data.find((blog) => blog._id === id);
    setData(foundBlog);
  };

  // fetch comments
  const fetchComments = async () => {
    setComments(comments_data);
  };

  // add comment
  const addComment = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative ">
      {/* gradient background */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      {/* navbar */}
      <Navbar />

      <div className="max-w-[1560px] mx-auto">
        {/* header */}
        <div className="mt-20 text-center text-gray-500">
          {/* published date */}
          <p className="text-primary py-4 font-medium">
            Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
          </p>

          {/* blog title */}
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
            {data.title}
          </h1>
          {/* blog sub title */}
          <p className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</p>
          {/* blog author */}
          <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 text-primary font-medium">
            Jenny Hill{" "}
          </p>
        </div>

        {/* blog content */}
        <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
          <img src={data.image} className="rounded-3xl mb-5" alt="" />

          <div
            dangerouslySetInnerHTML={{ __html: data.description }}
            className="rich-text max-w-3xl mx-auto"
          ></div>

          {/* comments section */}
          <div className="mt-14 mb-10 max-w-3xl mx-auto ">
            {/* comments count */}
            <p className="mb-4 font-semibold text-zinc-800">
              Comments ({comments.length})
            </p>{" "}
            {/* commnets list */}
            <div className="flex flex-col gap-4 ">
              {comments.map((item, index) => (
                <div
                  key={item._id}
                  className="relative bg-primary/2 border-primary/5 border max-w-xl p-4 rounded text-gray-600"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.user_icon} alt="" className="w-6" />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="text-sm max-md ml-8">{item.content}</p>
                  <div className="absolute right-4 top-5 flex items-center gap-2 text-xs ">
                    {Moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* comment form */}
          <div className="max-w-3xl mx-auto text-zinc-800">
            {/* form title */}
            <p className="font-semibold mb-4">Add your comment</p>
            {/* form */}
            <form
              onSubmit={addComment}
              className="flex flex-col  items-start gap-4 max-w-lg"
            >
              {/* name input */}
              <input
                onChange={handleChange}
                value={comment.name || ""}
                type="text"
                placeholder="Name"
                name="name"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
              {/* comment input */}
              <textarea
                onChange={handleChange}
                value={comment.content || ""}
                placeholder="Comment"
                name="content"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              ></textarea>

              {/* submit button */}
              <button
                type="submit"
                className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer resize-none"
              >
                submit
              </button>
            </form>
          </div>

          {/* share buttons */}
          <div className="my-24 max-w-3xl mx-auto">
            <p className="font-semibold my-4 text-zinc-800">
              Share this article on social media
            </p>
            <div className="flex items-center">
              <img src={assets.facebook_icon} width={50} alt="" />
              <img src={assets.twitter_icon} width={50} alt="" />
              <img src={assets.googleplus_icon} width={50} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
