import axios from "axios";
import setToken from "../../utilities/setToken";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADED,
  CLEAR_ERRORS,
  LOADING
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

// load user
export const loadUser = () => dispatch => {
  dispatch({ type: LOADING });
  // set token in headers
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  axios
    .get("/api/users/user")
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const registerUser = newUserData => dispatch => {
  dispatch({ type: LOADING });
  const body = JSON.stringify(newUserData);

  axios
    .post("/api/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });
    });
};
