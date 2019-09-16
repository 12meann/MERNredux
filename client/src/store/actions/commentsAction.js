import {
  ADD_COMMENT,
  COMMENT_ERROR,
  SHOW_COMMENTS,
  CLEAR_COMMENTS,
  LOADING_COMMENTS,
  REMOVE_SUCCESS_MSG,
  EDIT_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT
} from "./types";
import axios from "axios";

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
  dispatch({ type: LOADING_COMMENTS });
  axios
    .post(`/api/posts/${postId}/comment`, newComment)
    .then(res => {
      dispatch({ type: ADD_COMMENT, payload: res.data });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
    })
    .catch(err => {
      if (err) {
        dispatch({ type: COMMENT_ERROR, payload: err.response.data });
      }
    });
};

export const editComment = (updatedComment, postId, commentId) => dispatch => {
  dispatch({ type: LOADING_COMMENTS });
  axios
    .put(`/api/posts/${postId}/comment/${commentId}`, updatedComment)
    .then(res => {
      dispatch({ type: EDIT_COMMENT, payload: res.data });
      dispatch(showComments(postId));
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
    })
    .catch(err => {
      if (err) {
        dispatch({ type: COMMENT_ERROR });
      }
    });
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/${postId}/comment/${commentId}`)
    .then(res => {
      dispatch({ type: DELETE_COMMENT, payload: res.data });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
    })
    .catch(err => {
      dispatch({ type: COMMENT_ERROR, payload: err.response.data });
    });
};

export const clearComments = () => dispatch => {
  dispatch({ type: CLEAR_COMMENTS });
};

export const likeComment = (postId, commentId) => dispatch => {
  axios
    .put(`/api/posts/${postId}/comment/${commentId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_COMMENT,
        payload: {
          likes: res.data,
          postId,
          commentId
        }
      });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
    })
    .catch(err => {
      if (err) {
        dispatch({ type: COMMENT_ERROR, payload: err.response.data });
      }
    });
};

export const unLikeComment = (postId, commentId) => dispatch => {
  axios
    .put(`/api/posts/${postId}/comment/${commentId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_COMMENT,
        payload: {
          likes: res.data,
          postId,
          commentId
        }
      });
      setTimeout(() => dispatch({ type: REMOVE_SUCCESS_MSG }), 5000);
    })
    .catch(err => {
      if (err) {
        dispatch({ type: COMMENT_ERROR, payload: err.response.data });
      }
    });
};
