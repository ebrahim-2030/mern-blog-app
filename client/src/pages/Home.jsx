import BlogList from "../components/BlogList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Newletter from "../components/Newletter";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="px-4 max-w-[1560px] mx-auto">
        <Header />
        <BlogList />
        <Newletter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
