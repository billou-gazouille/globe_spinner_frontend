import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{}],
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFiltersToStore: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addFiltersToStore } = filtersSlice.actions;
export default filtersSlice.reducer;
