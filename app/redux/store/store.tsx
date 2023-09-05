import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../comments/comments";
import likeReducer from "../likes/likes";
import checkReducer from "../check/check";
import { save, load } from "redux-localstorage-simple";
import authReducer from "../auth/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    likes: likeReducer,
    check: checkReducer,
    // auth: authReducer,
  },
  preloadedState: typeof window !== "undefined" ? load() : undefined,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(save()),
});

console.log(authReducer, commentsReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
