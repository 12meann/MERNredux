import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";
import PostItemCard from "./PostItemCard";
import AddPost from "./AddPost";
import { getPostsFeed } from "../../store/actions/postActions";
import Typography from "@material-ui/core/Typography";

//MUI
import { withStyles } from "@material-ui/styles";
const styles = theme => ({});

class PostFeed extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    this.props.getPostsFeed();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // if (nextProps.post.posts) {
    //   this.setState({
    //     posts: nextProps.post.posts
    //   });
    // }
  }
  render() {
    console.log(this.props.posts.length);
    // const { posts } = this.state;
    const { isAuthenticated, posts, loading } = this.props;
    return (
      <div>
        {isAuthenticated && <AddPost />}

        {posts.length !== 0 ? (
          posts.map(post => <PostItemCard post={post} key={post._id} />)
        ) : (
          <Typography align="center">No posts found yet.</Typography>
        )}
        {/* {posts ? (
          posts.map(post => <PostItemCard post={post} key={post._id} />)
        ) : loading ? (
          <p>loading...</p>
        ) : (
          <p>No posts found yet.</p>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts,
  loading: state.post.loading
});

export default compose(
  connect(
    mapStateToProps,
    { getPostsFeed }
  ),
  withStyles(styles)
)(PostFeed);
