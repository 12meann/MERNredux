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
  LOADING,
  REMOVE_SUCCESS_MSG,
  DELETE_ACCOUNT,
  DELETE_FAIL
} from "./types";
import { closeLoginModal, closeRegisterModal } from "./modalActions";

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
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
      dispatch(closeRegisterModal());
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  dispatch({ type: LOADING });
  const body = JSON.stringify(userData);
  axios
    .post("/api/login", userData, body)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      dispatch({ type: CLEAR_ERRORS });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
      dispatch(closeLoginModal());
    })
    .catch(err => {
      console.log(err);
      if (err.response) {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data
        });
      }
    });
};

export const logOut = () => dispatch => {
  dispatch({ type: LOADING });
  dispatch({ type: LOGOUT_SUCCESS });
  setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
};

export const deleteAccount = () => dispatch => {
  dispatch({ type: LOADING });
  axios
    .delete(`/api/users/`)
    .then(res => {
      dispatch({ type: DELETE_ACCOUNT, payload: res.data });
      dispatch(loadUser());
    })
    .catch(err => {
      if (err.response) {
        dispatch({ type: DELETE_FAIL, payload: err.response.data });
      }
    });
};
