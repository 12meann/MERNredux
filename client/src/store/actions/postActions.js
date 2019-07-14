import axios from "axios";
import {
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  ADD_POST,
  EDIT_POST,
  LOADING,
  POST_ERROR,
  CLEAR_ERRORS
} from "./types";

export const addPost = newPost => dispatch => {
  dispatch({ type: LOADING });
  axios
    .post("/api/posts", newPost)
    .then(res => {
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: POST_ERROR,
        payload: err.response.data
      });
    });
};

export const getPostsFeed = () => dispatch => {
  dispatch({ type: LOADING });
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: POST_ERROR, payload: err.response.data });
    });
};
export const getPost = postId => dispatch => {
  dispatch({ type: LOADING });
  axios
    .get(`/api/posts/${postId}`)
    .then(res => {
      dispatch({ type: GET_POST, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: POST_ERROR, payload: err.response.data });
    });
};
