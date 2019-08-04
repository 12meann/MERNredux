import {
  GET_POSTS,
  GET_POST,
  GET_USER_INFO,
  ADD_POST,
  EDIT_POST,
  CLEAR_ERRORS,
  LOADING_POSTS,
  POST_ERROR,
  DELETE_POST,
  REMOVE_POST_MSG
} from "../actions/types";

const initialState = {
  loading: false,
  errors: {},
  posts: [],
  success: null,
  fail: null,
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
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
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
        errors: action.payload,
        fail: action.payload.msg
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
        posts: [...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(
          post => post._id !== action.payload.deletedPost._id
        ),
        success: action.payload.msg
      };
    case EDIT_POST:
      return {
        ...state,
        loading: false,
        success: action.payload.success
      };
    case REMOVE_POST_MSG:
      return {
        ...state,
        success: null
      };
    // case ADD_COMMENT_COUNT:
    //   return {
    //     ...state,
    //     posts: state.posts.map(post => {
    //       if (post.comments.length !== action.payload.post.comments.length) {
    //         post.comments.length + 1;
    //       }
    //     })
    //   };
    default:
      return state;
  }
};

export default postReducer;
