import axios from "axios";
import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  // DELETE_POST,
  // EDIT_POST,
  LOADING_POSTS,
  POST_ERROR,
  CLEAR_ERRORS
} from "./types";

export const addPost = newPost => dispatch => {
  dispatch({ type: LOADING_POSTS });
  axios
    .post("/api/posts", newPost)
    .then(res => {
      dispatch({ type: ADD_POST, payload: res.data });
      setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 5000);
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
export const getPost = postId => dispatch => {
  dispatch({ type: LOADING_POSTS });
  axios
    .get(`/api/posts/${postId}`)
    .then(res => {
      dispatch({ type: GET_POST, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: POST_ERROR, payload: err.response.data });
    });
};
