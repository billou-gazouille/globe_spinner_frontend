import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isConnected: false,
    token: null,
    firstname: null,
    lastname: null,
    email: null,
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loadDetails: (state, action) => {
      console.log("loading user details");
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
    },
    connect: (state) => {
        state.value.isConnected = true;
    },
    disconnect: (state) => {
      state.value = { ...initialState.value };
  },
  },
});

export const { connect, disconnect, loadDetails } = userInfoSlice.actions;
export default userInfoSlice.reducer;