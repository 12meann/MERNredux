import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItemCard from "./PostItemCard";
import AddPost from "./AddPost";
import { getPostsFeed } from "../../store/actions/postActions";
//MUI stuff
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

class PostFeed extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    this.props.getPostsFeed();
  }

  render() {
    const { isAuthenticated, posts, loading } = this.props;
    return (
      <div>
        {isAuthenticated && <AddPost />}

        {!loading ? (
          posts.length !== 0 ? (
            posts.map(post => <PostItemCard post={post} key={post._id} />)
          ) : (
            <Typography align="center">No posts found yet.</Typography>
          )
        ) : (
          <CircularProgress size={250} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts,
  loading: state.post.loading
});

PostFeed.propTypes = {
  getPostsFeed: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  { getPostsFeed }
)(PostFeed);
