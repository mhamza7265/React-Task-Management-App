import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const taskFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    EditDisplayType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default taskFilterSlice.reducer;
export const { EditDisplayType } = taskFilterSlice.actions;
