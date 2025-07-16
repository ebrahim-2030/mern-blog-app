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
    // trigger when updating start
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // trigger on updating success
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.loading = false;
      state.error = null;
    },
    // trigger on updating failure
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // trigger when updating start
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // trigger on updating success
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    // trigger on updating failure
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // trigger on signout success
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    }
    

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
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess
} = userSlice.actions;

// export reducer to use in the store
export default userSlice.reducer;
