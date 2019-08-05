import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { editComment } from "../../store/actions/commentsAction";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";

export class MoreCommentButton extends Component {
  state = {
    openEditModal: false,
    openDeleteModal: false,
    content: ""
  };
  //modal delete
  handleModalDelete = () => {
    const { openDeleteModal } = this.state;
    this.setState({
      openDeleteModal: !openDeleteModal
    });
  };
  handleDelete = e => {
    // const postId = this.props.post._id;
    // this.props.deleteComment(postId, CommentId);
    this.setState({
      openDeleteModal: false
    });
  };

  //edit modal
  handleModalEdit = () => {
    const { openEditModal } = this.state;
    this.setState({
      openEditModal: !openEditModal
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    const { editComment, postId, comment } = this.props;
    e.preventDefault();
    const editedComment = {
      content: this.state.content
    };
    editComment(editedComment, postId, comment._id);
  };
  componentDidMount() {
    this.setState({
      content: this.props.comment.content
    });
  }

  render() {
    const { openEditModal, openDeleteModal, content } = this.state;
    return (
      <Fragment>
        <IconButton
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleModalEdit}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleModalDelete}>
          <DeleteIcon color="error" />
        </IconButton>
        <EditCommentModal
          openEditModal={openEditModal}
          handleModalEdit={this.handleModalEdit}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          content={content}
        />
        <DeleteCommentModal />
      </Fragment>
    );
  }
}

MoreCommentButton.propTypes = {
  comment: PropTypes.object.isRequired
};

export default connect(
  null,
  { editComment }
)(MoreCommentButton);
