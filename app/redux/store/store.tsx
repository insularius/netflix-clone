import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import commentsReducer from "../comments/comments";
import likeReducer from "../likes/likes";
import checkReducer from "../check/check";
import { save, load } from "redux-localstorage-simple";
// export const store = configureStore({
//   reducer: {
//     comments: commentsReducer,
//     likes: likeReducer,
//   },
// });

// const saveToLocalStorage = (state: any) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("state", serializedState);
//   } catch (e) {
//     console.log(e);
//   }
// };

// const loadFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem("state");
//     if (serializedState === null) return undefined;
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.log(e);
//     return undefined;
//   }
// };

// const persistedState = loadFromLocalStorage();

// export const store = configureStore({
//   reducer: {
//     comments: commentsReducer,
//     likes: likeReducer,
//   },
//   preloadedState: persistedState,
// });

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    likes: likeReducer,
    check: checkReducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(save()),
  //   middleware: getDefaultMiddleware().prepend(save()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store.subscribe(() => saveToLocalStorage(store.getState()));

// export default store;
