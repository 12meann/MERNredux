import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likeComment, unLikeComment } from "../../store/actions/commentsAction";
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

const LikeComment = ({
  classes,
  comment,
  postId,
  user,
  openLoginModal,
  unLikeComment,
  likeComment,
  commentId
}) => {
  return (
    <div className={classes.heart}>
      {user ? (
        comment.likes.includes(user._id) ? (
          <Tooltip title="unlike comment" placement="top-end">
            <IconButton
              aria-label="unlike"
              className={classes.heart}
              onClick={() => unLikeComment(postId, commentId)}>
              <FavoriteIcon color="primary" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="like comment" placement="top-end">
            <IconButton
              className={classes.heart}
              aria-label="like"
              onClick={() => likeComment(postId, commentId)}>
              <FavoriteBorderIcon color="primary" />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Tooltip title="Login to like a Comment" placement="top-end">
          <IconButton
            aria-label="like"
            onClick={() => openLoginModal()}
            className={classes.heart}>
            <FavoriteBorderIcon color="primary" />
          </IconButton>
        </Tooltip>
      )}
      <small>
        {comment.likes.length === 1
          ? `${comment.likes.length} like`
          : comment.likes.length > 0
          ? `${comment.likes.length} likes`
          : `0 like`}
      </small>
    </div>
  );
  // }
};

LikeComment.propTypes = {
  classes: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  user: PropTypes.object,
  openLoginModal: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  unLikeComment: PropTypes.func.isRequired,
  commentId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { likeComment, openLoginModal, unLikeComment }
)(withStyles(styles)(LikeComment));
