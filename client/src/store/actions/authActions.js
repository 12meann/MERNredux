import axios from "axios";
import setToken from "../../utilities/setToken";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  USER_LOADED,
  CLEAR_ERRORS,
  LOADING,
  REMOVE_SUCCESS_MSG,
  DELETE_ACCOUNT,
  DELETE_FAIL,
  UPDATE_USER_PROFILE,
  UPDATE_USER_FAIL,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LIKE_USER,
  UNLIKE_USER,
  GET_USER_INFO,
  CLEAR_PROFILE,
  GET_USERS,
  GET_USERS_FAIL,
  EDIT_IMAGE,
  EDIT_IMAGE_FAIL
} from "./types";
import { closeLoginModal, closeRegisterModal } from "./modalActions";
import { getPostsFeed } from "./postActions";

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
      console.log(res);
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
      if (err) {
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response.data
        });
      }
    });
};

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING });
  const body = JSON.stringify(userData);
  axios
    .post("/api/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      dispatch({ type: CLEAR_ERRORS });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
      dispatch(closeLoginModal());
      history.push("/");
    })
    .catch(err => {
      // console.log(err);
      if (err.response) {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data
        });
      }
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

export const logOut = history => dispatch => {
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
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
    })
    .catch(err => {
      if (err.response) {
        dispatch({ type: DELETE_FAIL, payload: err.response.data });
      }
    });
};

export const editProfile = (formData, history) => dispatch => {
  dispatch({ type: LOADING });
  const body = JSON.stringify(formData);
  axios
    .put(`/api/users/`, body, config)
    .then(res => {
      dispatch({ type: UPDATE_USER_PROFILE, payload: res.data });
      dispatch(loadUser());
      dispatch({ type: CLEAR_ERRORS });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
      history.push("/");
    })
    .catch(err => {
      if (err.response) {
        dispatch({ type: UPDATE_USER_FAIL, payload: err.response.data });
      }
    });
};

export const likeUser = userId => dispatch => {
  axios
    .put(`/api/users/${userId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_USER,
        payload: {
          likes: res.data,
          userId
        }
      });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
    })
    .catch(err => {
      if (err) {
        dispatch({ type: UPDATE_USER_FAIL, payload: err.response.data });
      }
    });
};

export const unLikeUser = userId => dispatch => {
  axios
    .put(`/api/users/${userId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_USER,
        payload: {
          likes: res.data,
          userId
        }
      });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
    })
    .catch(err => {
      if (err) {
        dispatch({ type: UPDATE_USER_FAIL, payload: err.response.data });
        setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 5000);
      }
    });
};

export const getUserInfo = userId => dispatch => {
  dispatch({ type: LOADING });
  axios
    .get(`/api/users/${userId}/`)
    .then(res => {
      dispatch({ type: GET_USER_INFO, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      // dispatch({ type: US });
    });
};

export const getAllUsers = () => dispatch => {
  dispatch({ type: LOADING });
  axios
    .get("/api/users")
    .then(res => {
      dispatch({ type: GET_USERS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      if (err) {
        dispatch({ type: GET_USERS_FAIL, payload: err.response.data });
      }
    });
};
export const editImage = (userId, formData) => dispatch => {
  dispatch({ type: LOADING });
  axios
    .put(`/api/users/${userId}/editimage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      return dispatch({ type: EDIT_IMAGE, payload: res.data });
    })
    .then(() => {
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
      dispatch(getPostsFeed());
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: EDIT_IMAGE_FAIL, payload: err.response.data });
    });
};

export const clearProfile = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
};
