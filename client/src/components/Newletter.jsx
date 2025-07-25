
const Newletter = () => {
  return (
    // newsletter
    <div className="flex flex-col items-center justify-center text-center my-32 space-y-2">
      {/* newsletter heading */}
      <h1 className="text-2xl md:text-4xl font-semibold">Never Miss a Blog!</h1>
      {/* newletter description */}
      <p className="text-gray-500/70 pb-8 md:text-lg">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>
      {/* newsletter form */}
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13  h-12">
        <input
          type="text"
          placeholder="enter your email id"
          className="border border-gray-300 rounded-md h-full  border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
        />
        <button
          type="submit"
          className="px-8 md:px-12 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none"
        >
          subscribe
        </button>
      </form>
    </div>
  );
};

export default Newletter;
