import {
  ADD_COMMENT,
  DELETE_COMMENT,
  // CLEAR_ERRORS,
  COMMENT_ERROR,
  SHOW_COMMENTS,
  CLEAR_COMMENTS,
  LOADING_COMMENTS,
  REMOVE_SUCCESS_MSG,
  EDIT_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT
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
        // error: action.payload,
        error: action.payload.fail,
        loading: false
      };
    case EDIT_COMMENT:
      return {
        ...state,
        loading: false,
        success: action.payload.success
      };
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        comments: state.comments.filter(
          comment => comment._id !== action.payload.deletedComment._id
        )
      };

    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: null,
        commentCount: null,
        loading: false
      };
    case REMOVE_SUCCESS_MSG:
      return {
        ...state,
        success: null,
        loading: false
      };
    case LIKE_COMMENT:
    case UNLIKE_COMMENT:
      return {
        ...state,
        success: action.payload.likes.success,
        comments: state.comments.map(comment => {
          if (comment._id === action.payload.commentId)
            comment.likes = action.payload.likes.likes;
          return {
            ...comment
          };
        }),
        loading: false
      };
    default:
      return state;
  }
};

export default commentReducer;
