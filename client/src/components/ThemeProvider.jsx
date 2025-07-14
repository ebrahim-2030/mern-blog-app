import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  // get current theme from redux store
  const { theme } = useSelector((state) => state.theme);
  return (
    
    <div className={theme}>
      <div className="min-h-screen bg-white text-zinc-700 dark:bg-[rgb(16,23,42)] dark:text-gray-200">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
