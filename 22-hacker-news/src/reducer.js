import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_STORIES:
      return {
        ...state,
        stories: action.payload.hits,
        maxPages: action.payload.maxPages,
      };
    case REMOVE_STORY:
      return {
        ...state,
        stories: state.stories.filter(
          (item) => item.objectID !== action.payload
        ),
      };
    case HANDLE_PAGE:
      switch (action.payload) {
        case "prev":
          // Check if it is the first page
          if (state.page === 0) return { ...state, page: state.maxPages - 1 };
          return { ...state, page: state.page - 1 };
        case "next":
          // Check if it is the last page
          if (state.page === 49) return { ...state, page: 0 };
          return { ...state, page: state.page + 1 };
      }
    case HANDLE_SEARCH:
      return { ...state, search: action.payload };
    default:
      throw new Error("no matching action type");
  }
  return state;
};
export default reducer;
