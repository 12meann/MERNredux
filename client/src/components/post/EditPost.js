import React, { Component } from "react";
import { connect } from "react-redux";
import { editPost } from "../../store/actions/postActions";

//Mui
// import IconButton from "@material-ui/core/IconButton";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

class Post extends Component {
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
    this.props.editPost(this.state.content, this.props.post._id);
  };
  componentDidMount() {
    this.setState({
      // content: this.props.post.content
    });
  }

  render() {
    const { post } = this.props;
    const { content } = this.state;
    console.log(post);
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <TextField
          margin="dense"
          id="username"
          name="username"
          label="Username"
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
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // const id = ownProps.match.params.postid;
  // const posts = state.post.posts;
  // // const post = posts[id]
  // console.log(state.post.post);
  // console.log(id);
  // return {
  //   // post: state.post.post
  // };
};
Post.propTypes = {
  editProfile: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  { editPost }
)(Post);
