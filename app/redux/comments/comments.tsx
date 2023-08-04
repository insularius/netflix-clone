import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommentState = string[];

export interface RootState {
  comments: CommentState;
}

const initialState: CommentState = [];

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    deleteComment(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
