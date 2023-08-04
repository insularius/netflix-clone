import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
  isLiked: boolean;
}

const initialState: LikeState = {
  isLiked: false,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    toggleLike(state) {
      state.isLiked = !state.isLiked;
    },
  },
});

export const { toggleLike } = likeSlice.actions;

export default likeSlice.reducer;

export interface RootState {
  likes: LikeState;
}
