import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isConnected: false,
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    bookmarked: [false, false],
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loadDetails: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstName = action.payload.firstName;
      state.value.lastName = action.payload.lastName;
      state.value.email = action.payload.email;
    },
    connect: (state) => {
      state.value.isConnected = true;
    },
    disconnect: (state) => {
      state.value.isConnected = false;
    },
    toggleBookmark: (state, action) => {
      console.log("action", action.payload);
      state.value.bookmarked[action.payload] =
        !state.value.bookmarked[action.payload];
      console.log("store", state.value.bookmarked);
    },
    resetBookmarks: (state) => {
      state.value.bookmarked = [false, false];
    },
  },
});

export const {
  connect,
  disconnect,
  loadDetails,
  toggleBookmark,
  resetBookmarks,
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
