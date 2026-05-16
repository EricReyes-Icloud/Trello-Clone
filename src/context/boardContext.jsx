import { createContext, useReducer } from "react";
import boardReducer from "../reducers/boardReducer";

export const BoardContext = createContext();

const initialState = {
  lists: [
    {
      id: "1",
      title: "Por hacer",
      cards: []
    }
  ]
};

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};