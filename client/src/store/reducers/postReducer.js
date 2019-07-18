import {
  GET_POSTS,
  GET_USER_INFO,
  ADD_POST,
  // DELETE_POST,
  // EDIT_POST,
  CLEAR_ERRORS,
  LOADING_POSTS,
  POST_ERROR,
  RESET_POSTS
} from "../actions/types";

const initialState = {
  loading: false,
  errors: {},
  posts: [],
  post: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
        errors: {}
      };
    case GET_USER_INFO:
      return {
        ...state,
        posts: action.payload.posts,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
        posts: [...state.posts]
      };
    case RESET_POSTS:
      return {
        initialState
      };
    default:
      return state;
  }
};

export default postReducer;
