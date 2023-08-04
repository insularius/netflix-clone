"use client";

import React, { useReducer, createContext, useContext, Dispatch } from "react";

type CommentAction =
  | { type: "add"; comment: string }
  | { type: "delete"; index: number };

type CommentState = string[];

const CommentsStateContext = createContext<CommentState | undefined>(undefined);
const CommentsDispatchContext = createContext<
  Dispatch<CommentAction> | undefined
>(undefined);

function commentsReducer(
  state: CommentState,
  action: CommentAction
): CommentState {
  switch (action.type) {
    case "add":
      return [...state, action.comment];
    case "delete":
      return state.filter((_, index) => index !== action.index);
    default:
      throw new Error();
  }
}

export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comments, dispatch] = useReducer(commentsReducer, [], () => {
    const localComments = localStorage.getItem("videoComments");
    return [];
  });

  return (
    <CommentsStateContext.Provider value={comments}>
      <CommentsDispatchContext.Provider value={dispatch}>
        {children}
      </CommentsDispatchContext.Provider>
    </CommentsStateContext.Provider>
  );
};

export function useCommentsState() {
  const context = useContext(CommentsStateContext);
  if (context === undefined) {
    throw new Error("useCommentsState must be used within a CommentsProvider");
  }
  return context;
}

export function useCommentsDispatch() {
  const context = useContext(CommentsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useCommentsDispatch must be used within a CommentsProvider"
    );
  }
  return context;
}

// import React, { useReducer, createContext, useContext, Dispatch } from "react";

// type CommentAction =
//   | { type: "add"; comment: string }
//   | { type: "delete"; index: number };

// type CommentState = string[];

// interface CommentsContextType {
//   comments: CommentState;
//   dispatch: Dispatch<CommentAction>;
// }

// const CommentsContext = createContext<CommentsContextType | undefined>(
//   undefined
// );

// function commentsReducer(
//   state: CommentState,
//   action: CommentAction
// ): CommentState {
//   switch (action.type) {
//     case "add":
//       return [...state, action.comment];
//     case "delete":
//       return state.filter((_, index) => index !== action.index);
//     default:
//       throw new Error();
//   }
// }

// export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [comments, dispatch] = useReducer(commentsReducer, [], () => {
//     const localComments = localStorage.getItem("videoComments");
//     return localComments ? JSON.parse(localComments) : [];
//   });

//   return (
//     <CommentsContext.Provider value={{ comments, dispatch }}>
//       {children}
//     </CommentsContext.Provider>
//   );
// };

// export function useCommentsState() {
//   const context = useContext(CommentsContext);
//   if (context === undefined) {
//     throw new Error("useCommentsState must be used within a CommentsProvider");
//   }
//   return context.comments;
// }

// export function useCommentsDispatch() {
//   const context = useContext(CommentsContext);
//   if (context === undefined) {
//     throw new Error(
//       "useCommentsDispatch must be used within a CommentsProvider"
//     );
//   }
//   return context.dispatch;
// }

// export function useCommentsContext() {
//     return useContext(CommentsContext);
//   }

// type ActionType =
//   | { type: "ADD_COMMENT"; payload: string }
//   | { type: "DELETE_COMMENT"; payload: number };

// type Action =
//   | { type: "add"; comment: string }
//   | { type: "delete"; index: number };

// const commentsReducer = (state: string[], action: ActionType) => {
//   switch (action.type) {
//     case "ADD_COMMENT":
//       return [...state, action.payload];
//     case "DELETE_COMMENT":
//       return state.filter((_, index) => index !== action.payload);
//     default:
//       return state;
//   }
// };

// function reducer(state: string[], action: Action): string[] {
//   switch (action.type) {
//     case "add":
//       return [...state, action.comment];
//     case "delete":
//       return state.filter((_, index) => index !== action.index);
//     default:
//       throw new Error();
//   }
// }
