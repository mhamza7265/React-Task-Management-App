import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const completedTaskSlice = createSlice({
  name: "completed-tasks",
  initialState,
  reducers: {
    AddTaskComp: (state, action) => {
      state.data.push(action.payload);
    },
    RemoveTaskComp: (state, action) => {
      state.data = action.payload;
    },
    EditTaskStatusComp: (state, action) => {
      state.data[action.payload.index].Status = action.payload.data;
    },
    EditTaskComp: (state, action) => {
      state.data[action.payload.index].title = action.payload.data.title;
      state.data[action.payload.index].desc = action.payload.data.desc;
      state.data[action.payload.index].duedate = action.payload.data.duedate;
      state.data[action.payload.index].priority = action.payload.data.priority;
    },
  },
});

export default completedTaskSlice.reducer;
export const { AddTaskComp, RemoveTaskComp, EditTaskComp, EditTaskStatusComp } =
  completedTaskSlice.actions;
