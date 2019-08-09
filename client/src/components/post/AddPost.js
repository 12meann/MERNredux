import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../store/actions/postActions";
///MUI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Textfield from "@material-ui/core/Textfield";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    minHeight: 100,
    marginBottom: 10,
    boxShadow: "1px 2px 3px 0px rgba(0,0,0,0.8)"
  },
  margin: {
    margin: theme.spacing(2)
  },
  input: {
    marginLeft: "8px",
    flex: 1,
    padding: "15px"
  },
  button: {
    fontSize: "1 rem",
    lineHeight: "inherit",
    width: "20%",
    marginRight: "auto",
    padding: 0
  },
  label: {
    padding: "15px"
  },
  tooltip: {
    margin: 0,
    padding: 0
  }
});

class AddPost extends Component {
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
    const newPost = {
      content: this.state.content
    };
    this.props.addPost(newPost);
    this.setState({
      content: ""
    });
  };

  render() {
    const { classes } = this.props;
    const { content } = this.state;

    return (
      <form>
        <Paper className={classes.root}>
          <Textfield
            multiline
            autoFocus
            className={classes.input}
            label="What are your thoughts today?"
            name="content"
            margin="dense"
            id="content"
            value={content}
            type="text"
            onChange={this.handleChange}
            InputLabelProps={{
              className: classes.label
            }}
          />
          <Tooltip title="Add post" placement="top-end">
            <div className={classes.tooltip}>
              <Fab
                size="medium"
                color="primary"
                aria-label="add"
                className={classes.margin}
                onClick={this.handleSubmit}
                disabled={content.trim() === ""}>
                <AddIcon />
              </Fab>
            </div>
          </Tooltip>
        </Paper>
      </form>
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(withStyles(styles)(AddPost));
