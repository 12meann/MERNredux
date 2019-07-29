import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  COMMENT_ERROR,
  SHOW_COMMENTS,
  CLEAR_ERRORS,
  LOADING
} from "./types";
import axios from "axios";

export const showComments = postId => dispatch => {
  dispatch({ type: LOADING });
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

export const addComment = newComment => dispatch => {
  axios
    .post(`/api/posts/:postid/comment`)
    .then(res => {
      dispatch({ type: ADD_COMMENT, payload: res.data });
    })
    .catch(err => {
      if (err) {
        dispatch({ type: COMMENT_ERROR });
      }
    });
};
