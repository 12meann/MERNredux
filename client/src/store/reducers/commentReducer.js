import {
  ADD_COMMENT,
  // EDIT_COMMENT,
  // DELETE_COMMENT,
  // CLEAR_ERRORS,
  COMMENT_ERROR,
  SHOW_COMMENTS,
  CLEAR_COMMENTS,
  LOADING
} from "../actions/types";

const initialState = {
  comments: [],
  comment: null,
  error: null,
  success: null,
  loading: false
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: null
      };
    default:
      return state;
  }
};

export default commentReducer;
