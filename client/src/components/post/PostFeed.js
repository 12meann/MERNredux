import React, { Component } from "react";
import axios from "axios";
import PostItem from "./PostItem";

//MUI
import { withStyles } from "@material-ui/styles";
class PostFeed extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    axios.get("/api/posts").then(res => {
      this.setState({
        posts: res.data
      });
    });
  }
  render() {
    const { posts } = this.state;
    return (
      <div>
        {posts ? (
          posts.map(post => <PostItem post={post} key={post._id} />)
        ) : (
          <p>loading...</p>
        )}
      </div>
    );
  }
}

export default PostFeed;
