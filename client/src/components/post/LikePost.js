import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likePost, unLikePost } from "../../store/actions/postActions";
import { openLoginModal } from "../../store/actions/modalActions";

//MUI
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const styles = theme => ({});

class LikePost extends Component {
  handleLikePost = () => {
    this.props.likePost(this.props.postId);
  };
  handleUnLikePost = () => {
    this.props.unLikePost(this.props.postId);
  };
  render() {
    // console.log(likePost);
    // console.log(this.props);
    const { classes, post, user, openLoginModal } = this.props;
    return (
      <div>
        {user ? (
          post.likes.includes(user._id) ? (
            <IconButton aria-label="like" onClick={this.handleUnLikePost}>
              <FavoriteIcon
                color="primary"
                // className={classes.heart}
              />
            </IconButton>
          ) : (
            <IconButton aria-label="like" onClick={this.handleLikePost}>
              <FavoriteBorderIcon
                color="primary"
                // className={classes.heart}
              />
            </IconButton>
          )
        ) : (
          <IconButton aria-label="like" onClick={() => openLoginModal()}>
            <FavoriteBorderIcon
              color="primary"
              // className={classes.heart}
            />
          </IconButton>
        )}
        <small>{post.likes.length > 0 ? post.likes.length : 0} likes</small>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { likePost, openLoginModal, unLikePost }
)(LikePost);
