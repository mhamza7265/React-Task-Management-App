import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const loggedInUserSlice = createSlice({
  name: "logged in",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default loggedInUserSlice.reducer;
export const { loggedInUser } = loggedInUserSlice.actions;
