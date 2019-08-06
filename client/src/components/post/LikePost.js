import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likePost } from "../../store/actions/postActions";
import { openLoginModal } from "../../store/actions/modalActions";

//MUI
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const styles = theme => ({});

class LikePost extends Component {
  // likedPost = () => {
  //   // console.log(this.props.post.likes);
  //   // console.log(this.props.user._id);
  //   if (this.props.post.likes.includes(this.props.user._id){

  //   }
  // };
  handleLikePost = () => {
    this.props.likePost(this.props.postId);
  };
  handleUnlikePost = () => {
    // this.props.unlikePost(this.props.postId);
  };
  render() {
    // console.log(likePost);
    // console.log(this.props);
    const { classes, post, user, openLoginModal } = this.props;
    return (
      <div>
        {user ? (
          post.likes.includes(user._id) ? (
            <IconButton aria-label="like" onClick={this.handleLikePost}>
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
  { likePost, openLoginModal }
)(LikePost);
