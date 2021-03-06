import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    background: "rgba(220,53,69, 0.8)", // danger
    fontSize: "1rem",
    letterSpacing: 2
  },
  success: {
    background: "rgba(40, 167, 69, 0.8)", // success
    fontSize: "1rem",
    letterSpacing: 2
  }
});

class Message extends Component {
  state = {
    open: true
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false
    });
  };
  render() {
    const { classes, auth, post, comment } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
            classes: {
              root:
                auth.success || post.success || comment.success
                  ? classes.success
                  : classes.root
            }
          }}
          message={
            <span id="message-id">
              {auth.success ||
                auth.fail ||
                post.success ||
                post.error ||
                comment.success ||
                comment.error}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  comment: state.comment
});

Message.propTypes = {
  auth: PropTypes.object,
  post: PropTypes.object,
  comment: PropTypes.object,
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Message));
