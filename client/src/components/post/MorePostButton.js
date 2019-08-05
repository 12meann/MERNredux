import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost, editPost } from "../../store/actions/postActions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import EditPostModal from "./EditPostModal";
//MUI
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeletePostModal from "./DeletePostModal";

const styles = theme => ({
  // moreButton: {
  //   float: "right"
  // },
  // deleteMenu: {
  //   color: theme.palette.error.main
  // },
  // spinner: {
  //   position: "absolute"
  // },
  // disabledButton: {
  //   backgroundColor: theme.palette.error.light
  // }
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
    const postId = this.props.post._id;
    this.props.deletePost(postId);
    this.setState({
      openDeleteModal: false
    });
    console.log(postId);
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
          <MenuItem onClick={this.handleModalEdit}>Edit post</MenuItem>
          <MenuItem onClick={this.handleModalDelete}>Delete Post</MenuItem>
        </Menu>

        {/* EDIT dialog */}
        <EditPostModal
          openEditModal={openEditModal}
          handleChange={this.handleChange}
          handleModalEdit={this.handleModalEdit}
          handleSubmit={this.handleSubmit}
          content={content}
        />

        {/* Delete dialog */}
        <DeletePostModal
          openDeleteModal={openDeleteModal}
          handleModalDelete={this.handleModalDelete}
          handleDelete={this.handleDelete}
        />
      </Fragment>
    );
  }
}

MorePostButton.propTypes = {
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(
    null,
    { deletePost, editPost }
  ),
  withStyles(styles)
)(withRouter(MorePostButton));
