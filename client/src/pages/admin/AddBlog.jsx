import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();

  // refs for the Quill editor instance and its container
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  // state variables for form fields
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);


  // handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!title || !quillRef.current.root.innerHTML || !category || !image) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      setIsAdding(true);

      // const quillContent = quillRef.current.getText().trim();
      const quillContent = quillRef.current.root.innerHTML.trim();

      const blog = {
        title,
        subTitle,
        description: quillContent,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSubtitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
        setIsPublished(false);
        setImage(false)
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
    } finally {
      setIsAdding(false);
    }
  };

  //  generate content using AI
  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error("❗Service Unavailable in Your Region");
      }
    } catch (err) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        toast.error(err.message);
        console.log(err);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // intial Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-zinc-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* blog thumbnail */}
        <p className="">Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            className="mt-2 h-16  rounded cursor-pointer "
            alt=""
          />
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {/* blog title */}
        <p className="mt-4">Blog Title</p>
        <input
        value={title}
          type="text"
          placeholder="type here"
          required
          className="w-full max-w-lg mt-2 p-2 border  border-zinc-300  outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* blog subtitle */}
        <p className="mt-4">Blog Subtitle</p>
        <input
        value={subTitle}
          type="text"
          placeholder="type here"
          required
          className="w-full max-w-lg mt-2 p-2 border  border-zinc-300 outline-none rounded"
          onChange={(e) => setSubtitle(e.target.value)}
        />

        {/*  blog description */}
        <p className="mt-4">Blog Describtion</p>
        <div className="max-w-lg h-74 pb-26 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {
            loading && (
              <div className="absolute inset-0 flex items-center justify-center bgzinc-700/50 mt-2">
                <div className="h-8 w-8 rounded-full border border-t-white animate-spin">

                </div>
              </div>
            )
          }
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-zinc-700 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        {/* blog category */}
        <p className="mt-4">Blog Category</p>
        <select
        value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border  text-zinc-500 border-zinc-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        {/* blog publish */}
        <div className="flex gap-2 mt-4">
          <p>Publishe Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer accent-primary"
          />
        </div>

        {/* add blog buttons */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white text-sm rounded cursor-pointer"
        >
          {isAdding ? "Adding . . ." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
