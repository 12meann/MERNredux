import {
  ADD_COMMENT,
  // EDIT_COMMENT,
  // DELETE_COMMENT,
  COMMENT_ERROR,
  SHOW_COMMENTS,
  CLEAR_COMMENTS,
  LOADING_COMMENTS,
  REMOVE_SUCCESS_MSG
} from "./types";
import axios from "axios";
import { getPostsFeed } from "./postActions";

export const showComments = postId => dispatch => {
  dispatch({ type: LOADING_COMMENTS });
  axios
    .get(`/api/posts/${postId}/comment`)
    .then(res => {
      dispatch({ type: SHOW_COMMENTS, payload: res.data });
    })
    .catch(err => {
      if (err) {
        dispatch({ type: COMMENT_ERROR, payload: err.response.data });
      }
    });
};

export const addComment = (newComment, postId) => dispatch => {
  axios
    .post(`/api/posts/${postId}/comment`, newComment)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_COMMENT, payload: res.data });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
    })
    .catch(err => {
      console.log(err);
      if (err) {
        dispatch({ type: COMMENT_ERROR, payload: err.response.data });
      }
    });
};

export const clearComments = () => dispatch => {
  dispatch({ type: CLEAR_COMMENTS });
};
