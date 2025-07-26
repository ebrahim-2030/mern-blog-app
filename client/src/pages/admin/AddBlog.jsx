import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";

const AddBlog = () => {
  // refs for the Quill editor instance and its container
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // state variables for form fields
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  // handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  //  generate content using AI
  const generateContent = async () => {};

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
          type="text"
          placeholder="type here"
          required
          className="w-full max-w-lg mt-2 p-2 border  border-zinc-300  outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* blog subtitle */}
        <p className="mt-4">Blog Subtitle</p>
        <input
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
          <button
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
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white text-sm rounded cursor-pointer"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
