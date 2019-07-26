import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../store/actions/postActions";
///MUI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    // padding: 0,
    display: "flex",
    alignItems: "center",
    // width: 400,
    minHeight: 100,
    marginBottom: 10,
    boxShadow: "1px 2px 3px 0px rgba(0,0,0,0.8)"
  },
  input: {
    marginLeft: 8,
    flex: 1,
    padding: 15
  },
  button: {
    height: "100%",
    fontSize: "1.5rem",
    lineHeight: "inherit",
    width: "20%",
    margin: 0,
    padding: 0,
    position: "relative"
  },
  spinner: {
    position: "absolute"
  },
  // error: {
  //   display: "flex",
  //   alignItems: "center",
  //   height: 100,
  //   boxShadow: "1px 2px 3px 0px rgba(0,0,0,0.8)",
  //   borderColor: theme.palette.error.light,
  //   borderStyle: "solid",
  //   borderWidth: "2px",
  //   marginBottom: "5%"
  // },
  helperText: {
    position: "absolute",
    top: "29%"
  }
});

class AddPost extends Component {
  state = {
    content: "",
    errors: {}
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

  render() {
    const { classes, loading } = this.props;
    const { content } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Paper className={classes.root}>
            <InputBase
              multiline
              // rowsMax={20}
              autoFocus
              className={classes.input}
              placeholder="What are your thoughts today?"
              name="content"
              // margin="dense"
              id="content"
              value={content}
              type="text"
              onChange={this.handleChange}
              inputProps={{ margin: "dense" }}
            />
            {/* <FormHelperText
              margin="dense"
              className={classes.helperText}
              error={errors.content ? true : false}
              id="component-helper-text">
              {errors.content}
            </FormHelperText> */}
            <Button
              className={classes.button}
              variant="text"
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

AddPost.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  post: PropTypes.object,
  errors: PropTypes.object
};

export default connect(
  mapStateToProps,
  { addPost }
)(withStyles(styles)(AddPost));
