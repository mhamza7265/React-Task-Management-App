import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const newTaskSlice = createSlice({
  name: "new-tasks",
  initialState,
  reducers: {
    AddTask: (state, action) => {
      state.data.push(action.payload);
    },
    RemoveTask: (state, action) => {
      state.data = action.payload;
    },
    EditTaskStatus: (state, action) => {
      state.data[action.payload.index].Status = action.payload.data;
    },
    EditTask: (state, action) => {
      state.data[action.payload.index].title = action.payload.data.title;
      state.data[action.payload.index].desc = action.payload.data.desc;
      state.data[action.payload.index].duedate = action.payload.data.duedate;
      state.data[action.payload.index].priority = action.payload.data.priority;
    },
  },
});

export default newTaskSlice.reducer;
export const { AddTask, RemoveTask, EditTask, EditTaskStatus } =
  newTaskSlice.actions;
