import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class LikeButton extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        user._id === likes.
        <IconButton aria-label="like">
          <FavoriteIcon className={classes.heart} />
        </IconButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(withStyles(styles)(LikeButton));
