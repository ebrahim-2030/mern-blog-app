// import routing tools from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import page components
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";

const App = () => {
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        {/* home page route */}
        <Route path="/" element={<Home />} />
        {/* about page route */}
        <Route path="/about" element={<About />} />
        {/* singin page route */}
        <Route path="/signin" element={<SignIn />} />
        {/* signup page route */}
        <Route path="/signup" element={<SignUp />} />
        {/* projects page route */}
        <Route path="/projects" element={<Projects />} />
        {/* dashboard page route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* footer component */}
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;
