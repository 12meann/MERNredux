import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { addPost } from "../../store/actions/postActions";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import FormHelperText from "@material-ui/core/FormHelperText";
import { CircularProgress } from "@material-ui/core";

const styles = theme => ({
  root: {
    // padding: 0,
    display: "flex",
    alignItems: "center",
    // width: 400,
    height: 100,
    marginBottom: 10,
    boxShadow: "1px 2px 3px 0px rgba(0,0,0,0.8)"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  button: {
    height: "100%",
    fontSize: "1.5rem",
    lineHeight: "inherit",
    width: "20%",
    // padding: "20px",
    margin: 0,
    padding: 0,
    position: "relative"
  },
  spinner: {
    position: "absolute"
  }
});

class AddPost extends Component {
  state = {
    content: "",
    errors: null
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const newPost = {
      content: this.state.content
    };
    this.props.addPost(newPost);
    this.setState({
      content: ""
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.post.errors) {
      this.setState({
        errors: nextProps.post.errors
      });
    }
  }
  render() {
    const { classes, errors, loading } = this.props;
    const { content } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Paper className={classes.root}>
            <InputBase
              multiline
              autoFocus
              className={classes.input}
              placeholder="What are your thoughts today?"
              name="content"
              margin="dense"
              id="content"
              error={content === ""}
              value={content}
              type="text"
              onChange={this.handleChange}
              inputProps={{
                "aria-label": "What are your thoughts today?"
              }}
            />
            <FormHelperText
              margin="dense"
              error={errors.content ? true : false}
              id="component-helper-text">
              {errors.content}
            </FormHelperText>
            <Button
              className={classes.button}
              variant="contained"
              disabled={content.trim() === ""}
              type="submit"
              color="primary">
              Add <br /> Post
              {loading ? (
                <CircularProgress size={40} className={classes.spinner} />
              ) : null}
            </Button>
          </Paper>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.post.loading,
  post: state.post,
  errors: state.post.errors
});

export default compose(
  connect(
    mapStateToProps,
    { addPost }
  ),
  withStyles(styles)
)(AddPost);
