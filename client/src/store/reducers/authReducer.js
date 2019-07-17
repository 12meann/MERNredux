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
  UPDATE_USER_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  user: null,
  errors: null,
  success: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
        loading: false
      };
    case REMOVE_SUCCESS_MSG:
      return {
        ...state,
        success: null
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
        errors: action.payload
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        success: action.payload.success,
        loading: false
        // user: action.payload.doc
      };
    default:
      return state;
  }
};

export default authReducer;
