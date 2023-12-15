import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isConnected: false,
    hello: 'goodbye',
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setIsConnected: (state, action) => {
        console.log("here");
        state.value.isConnected = action.payload;
    },
  },
});

export const { setIsConnected } = userInfoSlice.actions;
export default userInfoSlice.reducer;