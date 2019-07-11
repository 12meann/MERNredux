import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    background: "rgba(220,53,69, 0.8)",
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
    const { classes } = this.props;
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
              root: classes.root
            }
          }}
          message={<span id="message-id">{this.props.msg}</span>}
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

export default withStyles(styles)(Message);
