import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    EditDisplayType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default displaySlice.reducer;
export const { EditDisplayType } = displaySlice.actions;
