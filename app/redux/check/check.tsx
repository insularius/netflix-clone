import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckState {
  isChecked: boolean;
}

const initialState: CheckState = {
  isChecked: false,
};

const checkSlice = createSlice({
  name: "check",
  initialState,
  reducers: {
    toggleCheck(state) {
      state.isChecked = !state.isChecked;
    },
  },
});

export const { toggleCheck } = checkSlice.actions;

export default checkSlice.reducer;
