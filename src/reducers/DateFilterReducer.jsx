import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const dateFilterSlice = createSlice({
  name: "date-filter",
  initialState,
  reducers: {
    AddDate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default dateFilterSlice.reducer;
export const { AddDate } = dateFilterSlice.actions;
