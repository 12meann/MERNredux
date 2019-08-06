import React, { Component } from "react";
import { connect } from "react-redux";

// import PropTypes from "prop-types";
import { addComment } from "../../store/actions/commentsAction";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCommentIcon from "@material-ui/icons/AddComment";
import Textfield from "@material-ui/core/Textfield";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = theme => ({
  input: {
    width: "100%",
    margin: "30px 0"
  }
});

export class AddComment extends Component {
  state = {
    content: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { postId, addComment } = this.props;
    const newComment = {
      content: this.state.content
    };
    addComment(newComment, postId);
    this.setState({
      content: ""
    });
  };
  render() {
    const { content } = this.state;
    const { classes } = this.props;
    return (
      <form>
        <Textfield
          multiline
          variant="outlined"
          // rowsMax={20}
          autoFocus
          label="Add a comment"
          name="content"
          fullwidth={true.toString()}
          margin="dense"
          id="content"
          value={content}
          className={classes.input}
          type="text"
          onChange={this.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" aria-label="User">
                <IconButton
                  aria-label="More"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={this.handleSubmit}>
                  <AddCommentIcon color="primary" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </form>
    );
  }
}

export default connect(
  null,
  { addComment }
)(withStyles(styles)(AddComment));
