import {
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  ADD_POST,
  EDIT_POST,
  LOADING_POSTS,
  POST_ERROR,
  CLEAR_ERRORS
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
        post: action.payload,
        posts: state.posts,
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
