import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost, editPost } from "../../store/actions/postActions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
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
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

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
      backgroundColor: theme.palette.error.main,
      color: "#fff"
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
    openDeleteModal: false,
    openEditModal: false,
    content: ""
  };
  // more menu button
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
  //modal delete
  handleModalDelete = () => {
    const { openDeleteModal } = this.state;
    this.setState({
      openDeleteModal: !openDeleteModal,
      anchorEl: null
    });
  };
  handleDelete = e => {
    const postId = this.props.postId;
    this.props.deletePost(postId);
    this.setState({
      openDeleteModal: false
    });
  };
  //edit modal
  handleModalEdit = () => {
    const { openEditModal } = this.state;
    this.setState({
      openEditModal: !openEditModal,
      anchorEl: null
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const editedPost = {
      content: this.state.content
    };
    this.props.editPost(editedPost, this.props.post._id);
  };
  componentDidMount() {
    this.setState({
      content: this.props.post.content
    });
  }
  render() {
    const { anchorEl, openDeleteModal, openEditModal, content } = this.state;
    const { classes } = this.props;
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
          <MenuItem
            onClick={this.handleModalEdit}
            // component={Link}
            // to={`/posts/${_id}/edit`}
            // content={content}
            // post={post}
          >
            Edit post
          </MenuItem>
          <MenuItem onClick={this.handleModalDelete}>Delete Post</MenuItem>
        </Menu>
        {/* ======================================= */}
        {/* EDIT dialog */}
        <Dialog
          open={openEditModal}
          onClose={this.handleModalEdit}
          aria-labelledby="Edit modal"
          className={classes.dialog}
          fullWidth
          maxWidth="sm">
          <DialogTitle id="Edit" align="center">
            Edit / Update Post
          </DialogTitle>
          <DialogContent>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                margin="dense"
                id="content"
                name="content"
                label="Edit post"
                type="text"
                onChange={this.handleChange}
                value={content}
                fullWidth
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment
                //       position="end"
                //       aria-label="User"
                //       className={classes.adornment}>
                //       <FaceIcon color="primary" />
                //     </InputAdornment>
                //   )
                // }}
              />
              <DialogActions>
                <Button
                  variant="outlined"
                  type="submit"
                  className={classes.editButton}
                  fullWidth
                  size="large">
                  Update
                </Button>
                <Button
                  variant="contained"
                  onClick={this.handleModalEdit}
                  fullWidth
                  color="secondary"
                  size="large">
                  CANCEL
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        {/* ======================================= */}
        {/* Delete dialog */}
        <Dialog
          open={openDeleteModal}
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
                size="large">
                DELETE
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

MorePostButton.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(
    null,
    { deletePost, editPost }
  ),
  withStyles(styles)
)(withRouter(MorePostButton));
