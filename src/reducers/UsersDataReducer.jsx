import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersDataSlice = createSlice({
  name: "user data",
  initialState,
  reducers: {
    EDITUSERSPASSWORD: (state, action) => {
      state.users[action.payload.index].password = action.payload.password;
    },
    AddUsers: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export default usersDataSlice.reducer;
export const { AddUsers, EDITUSERSPASSWORD } = usersDataSlice.actions;
