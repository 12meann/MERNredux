import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../../store/actions/postActions";

//Mui
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import PropTypes from "prop-types";

class Post extends Component {
  static propTypes = {
    getPost: PropTypes.func
  };

  componentDidMount() {
    const postId = this.props.match.params.postid;
    this.props.getPost(postId);
  }
  render() {
    const { post } = this.props;
    return <div>{post ? post.postedBy.username : <p>loading</p>}</div>;
  }
}

const mapStateToProps = state => ({
  post: state.post.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
