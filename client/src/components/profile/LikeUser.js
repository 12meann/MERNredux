import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likePost, unLikePost } from "../../store/actions/postActions";
import { openLoginModal } from "../../store/actions/modalActions";

//MUI
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  heart: {
    marginLeft: "auto"
  }
});

const LikeUser = ({
  classes,
  post,
  user,
  openLoginModal,
  unLikePost,
  likePost,
  postId
}) => {
  return (
    <div className={classes.heart}>
      {user ? (
        post.likes.includes(user._id) ? (
          <Tooltip title="unlike post" placement="top-end">
            <IconButton aria-label="like" onClick={() => unLikePost(postId)}>
              <FavoriteIcon color="primary" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="like post" placement="top-end">
            <IconButton
              aria-label="like"
              onClick={() => likePost(postId)}
              className={classes.heart}>
              <FavoriteBorderIcon color="primary" />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Tooltip title="Login to like a post" placement="top-end">
          <IconButton
            aria-label="like"
            onClick={() => openLoginModal()}
            className={classes.heart}>
            <FavoriteBorderIcon color="primary" />
          </IconButton>
        </Tooltip>
      )}
      <small>
        {post.likes.length === 1
          ? `${post.likes.length} like`
          : post.likes.length > 0
          ? `${post.likes.length} likes`
          : `0 like`}
      </small>
    </div>
  );
  // }
};

LikeUser.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
  openLoginModal: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { likePost, openLoginModal, unLikePost }
)(withStyles(styles)(LikeUser));
