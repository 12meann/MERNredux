import {
  ADD_COMMENT,
  // EDIT_COMMENT,
  // DELETE_COMMENT,
  // CLEAR_ERRORS,
  COMMENT_ERROR,
  SHOW_COMMENTS,
  CLEAR_COMMENTS,
  LOADING_COMMENTS,
  REMOVE_SUCCESS_MSG
} from "../actions/types";

const initialState = {
  comments: [],
  comment: null,
  error: null,
  success: null,
  loading: false,
  commentCount: null
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        commentCount: action.payload.length
      };
    case LOADING_COMMENTS:
      return {
        ...state,
        loading: true
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
        success: action.payload.success,
        loading: false,
        commentCount: state.comments.length + 1
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        fail: action.payload.fail
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: null,
        commentCount: null
      };
    case REMOVE_SUCCESS_MSG:
      return {
        ...state,
        success: null
      };
    default:
      return state;
  }
};

export default commentReducer;
