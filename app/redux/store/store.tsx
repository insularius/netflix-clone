import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import commentsReducer from "../comments/comments";
import likeReducer from "../likes/likes";
import checkReducer from "../check/check";
import { save, load } from "redux-localstorage-simple";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    likes: likeReducer,
    check: checkReducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(save()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
