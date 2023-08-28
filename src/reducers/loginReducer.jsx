import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    isLoggedIn: (state) => {
      state.current = true;
    },
    isLoggedOut: (state) => {
      state.current = false;
    },
  },
});

export default loginSlice.reducer;
export const { isLoggedIn, isLoggedOut } = loginSlice.actions;
