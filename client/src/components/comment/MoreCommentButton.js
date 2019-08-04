import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export class MoreCommentButton extends Component {
  static propTypes = {};

  render() {
    return (
      <Fragment>
        <IconButton
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleEdit}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Fragment>
    );
  }
}

export default MoreCommentButton;
