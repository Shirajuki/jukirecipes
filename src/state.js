import React, { useReducer, useContext } from "react";

const StateContext = React.createContext();
const initialState = { searchValue: "", searched: "", loading: false };

export const useStateValue = () => useContext(StateContext);

export const StateProvider = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_VALUE":
      return { ...state, searchValue: action.payload };
    case "SET_SEARCHED":
      return { ...state, searched: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
