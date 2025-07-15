// import createSlice from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// initial state for the user slice
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

// create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // trigger when signin starts
    signinStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    // trigger on successful signin
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    // trigger on failure signin
    signinFailuer: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // update start
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // update success
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.loading = false;
      state.error = null;
    },
    // update failure
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export actions for dispatching in components
export const {
  signinStart,
  signinSuccess,
  signinFailuer,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions;

// export reducer to use in the store
export default userSlice.reducer;
