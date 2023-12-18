import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isConnected: false,
    token: null,
    firstName: null,
    lastName: null,
    email: null,
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loadDetails: (state, action) => {
      //console.log("action.payload: ", action.payload);
      state.value.token = action.payload.token;
      state.value.firstName = action.payload.firstName;
      state.value.lastName = action.payload.lastName;
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