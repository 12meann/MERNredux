import axios from "axios";
import {
  GET_POSTS,
  GET_USER_INFO,
  ADD_POST,
  DELETE_POST,
  // EDIT_POST,
  LOADING_POSTS,
  POST_ERROR,
  CLEAR_ERRORS,
  RESET_POSTS
} from "./types";

export const addPost = newPost => dispatch => {
  dispatch({ type: LOADING_POSTS });
  axios
    .post("/api/posts", newPost)
    .then(res => {
      dispatch({ type: ADD_POST, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      if (err) {
        dispatch({
          type: POST_ERROR,
          payload: err.response.data
        });
      }
    });
};

export const getPostsFeed = () => dispatch => {
  dispatch({ type: LOADING_POSTS });
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch({ type: POST_ERROR, payload: err.response.data });
      }
    });
};

export const getUserInfo = userId => dispatch => {
  dispatch({ type: LOADING_POSTS });
  axios
    .get(`/api/users/${userId}/`)
    .then(res => {
      dispatch({ type: GET_USER_INFO, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: POST_ERROR });
    });
};

export const deletePost = postId => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => {
      dispatch({ type: DELETE_POST, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: POST_ERROR, payload: err.response.data });
    });
};
