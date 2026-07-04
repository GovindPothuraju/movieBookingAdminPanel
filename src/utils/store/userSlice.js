import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState:{
    admin :null,
    isAuthenticated: false
  },
  reducers: {
    setUser: (state, action) => {
      state.admin = action.payload
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.admin = null
      state.isAuthenticated = false;
    }
  }
})

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;