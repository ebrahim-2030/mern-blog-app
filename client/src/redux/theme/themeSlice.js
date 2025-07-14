import { createSlice } from "@reduxjs/toolkit";
import reducer from "../user/userSlice";

// initial state
const initialState = {
  theme: "light",
};

// create theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {
    // toggle the theme
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      console.log(state.theme);
    },
  },
});

// export toggle theme
export const { toggleTheme } = themeSlice.actions;

// export theme reducer to use in redux store
export default themeSlice.reducer;
