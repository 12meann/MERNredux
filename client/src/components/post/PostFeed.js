import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";
import PostItemCard from "./PostItemCard";
import AddPost from "./AddPost";
import { getPostsFeed } from "../../store/actions/postActions";

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
    // const { posts } = this.state;
    const { isAuthenticated, posts } = this.props;
    return (
      <div>
        {isAuthenticated && <AddPost />}

        {posts ? (
          posts.map(post => <PostItemCard post={post} key={post._id} />)
        ) : (
          <p>loading...</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts
});

export default compose(
  connect(
    mapStateToProps,
    { getPostsFeed }
  ),
  withStyles(styles)
)(PostFeed);
