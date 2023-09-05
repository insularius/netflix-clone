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
    // const localComments = localStorage.getItem("videoComments");
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
