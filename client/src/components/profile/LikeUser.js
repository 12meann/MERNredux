import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likeUser, unLikeUser } from "../../store/actions/authActions";
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
  profile,
  user,
  openLoginModal,
  unLikeUser,
  likeUser,
  userId
}) => {
  return (
    <div className={classes.heart}>
      {user ? (
        profile.likes.includes(user._id) ? (
          <Tooltip title="unlike user" placement="top-end">
            <IconButton aria-label="like" onClick={() => unLikeUser(userId)}>
              <FavoriteIcon color="primary" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="like user" placement="top-end">
            <IconButton
              aria-label="like"
              onClick={() => likeUser(userId)}
              className={classes.heart}>
              <FavoriteBorderIcon color="primary" />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Tooltip title="Login to like the user" placement="top-end">
          <IconButton
            aria-label="like"
            onClick={() => openLoginModal()}
            className={classes.heart}>
            <FavoriteBorderIcon color="primary" />
          </IconButton>
        </Tooltip>
      )}
      <small>
        {profile.likes.length === 1
          ? `${profile.likes.length} like`
          : profile.likes.length > 0
          ? `${profile.likes.length} likes`
          : `0 like`}
      </small>
    </div>
  );
};

LikeUser.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object,
  user: PropTypes.object,
  openLoginModal: PropTypes.func.isRequired,
  likeUser: PropTypes.func.isRequired,
  unLikeUser: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile
});

export default connect(
  mapStateToProps,
  { likeUser, openLoginModal, unLikeUser }
)(withStyles(styles)(LikeUser));
