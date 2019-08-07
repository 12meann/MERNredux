import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItemCard from "./PostItemCard";
import AddPost from "./AddPost";
import { getPostsFeed } from "../../store/actions/postActions";
import { loadUser } from "../../store/actions/authActions";
//MUI stuff
import Typography from "@material-ui/core/Typography";
import Loading from "../layout/Loading";

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
      <Fragment>
        {loading ? (
          // <Typography align="center">Loading...</Typography>
          <Loading />
        ) : posts.length === 0 ? (
          <Fragment>
            {isAuthenticated && <AddPost />}
            <Typography align="center">No post yet</Typography>
          </Fragment>
        ) : (
          <Fragment>
            {isAuthenticated && <AddPost />}

            {posts.map(post =>
              post ? <PostItemCard post={post} key={post._id} /> : null
            )}
          </Fragment>
        )}
      </Fragment>
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
  { getPostsFeed, loadUser }
)(PostFeed);
