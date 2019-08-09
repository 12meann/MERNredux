import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DELETE_ACCOUNT,
  DELETE_FAIL,
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOADING,
  REMOVE_SUCCESS_MSG,
  UPDATE_USER_PROFILE,
  UPDATE_USER_FAIL,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LIKE_USER,
  UNLIKE_USER,
  GET_USER_INFO,
  CLEAR_PROFILE
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  user: null,
  success: null,
  errors: null,
  fail: null,
  profile: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        fail: null
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true,
        fail: null
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        errors: action.payload,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        fail: null
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
        fail: null,
        loading: false
      };
    case REMOVE_SUCCESS_MSG:
      return {
        ...state,
        success: null,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        success: "You have succesfully logout."
      };
    case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        success: action.payload.success
      };
    case DELETE_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        fail: action.payload.fail
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        success: action.payload.success,
        loading: false
      };
    case LIKE_USER:
    case UNLIKE_USER:
      return {
        ...state,
        success: action.payload.likes.success,
        profile: {
          ...state.profile,
          likes: action.payload.likes.likes
        },
        loading: false
      };
    case GET_USER_INFO:
      return {
        ...state,
        profile: action.payload.user,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
