import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  loading: false,
  stories: [],
  page: 0,
  maxPages: 0,
  search: "react",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // Remove story
  const remove = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  // Change page
  const changePage = (operation) => {
    dispatch({ type: HANDLE_PAGE, payload: operation });
  };

  // Search
  const searchQuery = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  // Fetch items
  const getStories = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const url =
        API_ENDPOINT + "query=" + state.search + "&page=" + state.page;
      const response = await fetch(url);
      const data = await response.json();
      const { hits, nbPages: maxPages } = data;
      console.log(data);
      dispatch({ type: SET_STORIES, payload: { hits, maxPages } });
      dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStories();
  }, [state.page, state.search]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        remove,
        changePage,
        searchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
