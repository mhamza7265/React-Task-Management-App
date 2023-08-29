import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    isLoggedIn: (state, action) => {
      state.current = action.payload;
    },
    isLoggedOut: (state, action) => {
      state.current = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { isLoggedIn, isLoggedOut } = loginSlice.actions;
