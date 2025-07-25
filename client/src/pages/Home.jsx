import BlogList from "../components/BlogList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Newletter from "../components/Newletter";

const Home = () => {
  return (
    <>
      <div className="px-4">
        <Navbar />
        <Header />
        <BlogList />
        <Newletter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
