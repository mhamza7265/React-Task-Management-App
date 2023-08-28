import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: null,
};

const indexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {
    AddIndex: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default indexSlice.reducer;
export const { AddIndex } = indexSlice.actions;
