import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  // DELETE_POST,
  // EDIT_POST,
  // CLEAR_ERRORS,
  LOADING_POSTS,
  POST_ERROR
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
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
