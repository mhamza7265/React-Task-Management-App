import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      firstname: "Ali",
      lastname: "Haider",
      username: "user11",
      designation: "XYZ",
      id: 1,
      email: "ali@xyz.com",
      contact: "03000000000",
      password: "user1",
      userkey: 0.421548461,
    },
    {
      firstname: "Ahsan",
      lastname: "Hassan",
      username: "user22",
      designation: "XYZ",
      id: 2,
      email: "ahsan@xyz.com",
      contact: "03000000000",
      password: "user2",
      userkey: 0.811542626,
    },
    {
      firstname: "Hamza",
      lastname: "Hanif",
      username: "user33",
      designation: "XYZ",
      id: 3,
      email: "hamza@xyz.com",
      contact: "03000000000",
      password: "user3",
      userkey: 0.48484158,
    },
  ],
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
