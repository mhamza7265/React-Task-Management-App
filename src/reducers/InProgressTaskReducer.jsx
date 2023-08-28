import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const inProgressTaskSlice = createSlice({
  name: "inprogress-tasks",
  initialState,
  reducers: {
    AddTaskIP: (state, action) => {
      state.data.push(action.payload);
    },
    RemoveTaskIP: (state, action) => {
      state.data = action.payload;
    },
    EditTaskStatusIP: (state, action) => {
      state.data[action.payload.index].Status = action.payload.data;
    },
    EditTaskIP: (state, action) => {
      state.data[action.payload.index].title = action.payload.data.title;
      state.data[action.payload.index].desc = action.payload.data.desc;
      state.data[action.payload.index].duedate = action.payload.data.duedate;
      state.data[action.payload.index].priority = action.payload.data.priority;
    },
  },
});

export default inProgressTaskSlice.reducer;
export const { AddTaskIP, RemoveTaskIP, EditTaskIP, EditTaskStatusIP } =
  inProgressTaskSlice.actions;
