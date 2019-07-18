import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../store/actions/postActions";
import { Link } from "react-router-dom";

//MUI
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";

const styles = theme => ({
  moreButton: {
    float: "right"
  },
  deleteMenu: {
    color: theme.palette.error.main
  },
  deleteButton: {
    borderColor: theme.palette.error.dark,
    color: "#000",
    "&:hover": {
      backgroundColor: theme.palette.error.main
    }
  },
  dialog: {
    padding: "20px",
    textAlign: "center"
  },
  spinner: {
    position: "absolute"
  },
  disabledButton: {
    backgroundColor: theme.palette.error.light
  }
});

export class MorePostButton extends Component {
  state = {
    anchorEl: null,
    openModal: false
  };
  handleClickMenu = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };
  handleCloseMenu = () => {
    this.setState({
      anchorEl: null
    });
  };
  handleModalDelete = () => {
    const { openModal } = this.state;
    this.setState({
      openModal: !openModal,
      anchorEl: null
    });
  };
  handleDelete = e => {
    const postId = this.props.postId;
    this.props.deletePost(postId);
    this.setState({
      openModal: false
    });
  };
  render() {
    const { anchorEl, openModal } = this.state;
    const { classes, loading } = this.props;
    return (
      <Fragment>
        <IconButton
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleClickMenu}>
          <MoreVertIcon color="primary" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}>
          <MenuItem component={Link}>Edit post</MenuItem>
          <MenuItem onClick={this.handleModalDelete}>Delete Post</MenuItem>
        </Menu>

        {/* Delete dialog */}
        <Dialog
          open={openModal}
          onClose={this.handleModalDelete}
          aria-labelledby="Delete modal"
          className={classes.dialog}
          fullWidth
          maxWidth="sm">
          <DialogTitle id="Login" align="center">
            Delete Post ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant="h6">
              This is irreversable.
              <br />
              <br />
              Are you sure you want to delete this post?
              <br />
              <br />
            </DialogContentText>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={this.handleDelete}
                className={classes.deleteButton}
                fullWidth
                disabled={loading}
                classes={{ disabled: classes.disabledButton }}
                size="large">
                DELETE
                {loading && (
                  <CircularProgress size={30} className={classes.spinner} />
                )}
              </Button>
              <Button
                variant="contained"
                onClick={this.handleModalDelete}
                fullWidth
                color="secondary"
                size="large">
                CANCEL
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.post.loading
});

MorePostButton.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  null,
  { deletePost }
)(withStyles(styles)(MorePostButton));
