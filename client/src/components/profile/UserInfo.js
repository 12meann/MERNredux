import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItemCard from "../post/PostItemCard";
import { connect } from "react-redux";
import { getUserInfo } from "../../store/actions/postActions";
import { clearProfile } from "../../store/actions/authActions";
import StaticProfile from "./StaticProfile";
import Message from "../layout/Message";
import Loading from "../layout/Loading";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

const styles = {
  dashboard: {
    margin: "0 auto",
    padding: 20,
    paddingTop: 40
  },
  gridItem: {
    width: "100%",
    margin: "0 auto"
  }
};

class UserInfo extends Component {
  componentDidMount() {
    const userId = this.props.match.params.userid;
    this.props.getUserInfo(userId);
  }
  componentWillUnmount() {
    this.props.clearProfile();
  }
  render() {
    const { loading, posts, classes, auth, post, comment } = this.props;

    const userPosts = !loading ? (
      posts.length === 0 ? (
        <Typography align="center">No post found.</Typography>
      ) : (
        posts.map(post => <PostItemCard post={post} key={post._id} />)
      )
    ) : (
      <Loading />
    );
    return (
      <Grid container className={classes.dashboard}>
        {auth.success ||
        auth.fail ||
        post.success ||
        comment.success ||
        post.error ||
        comment.error ? (
          <Message />
        ) : null}
        <Grid item sm={12} md={7} className={classes.gridItem}>
          {userPosts}
        </Grid>
        <Grid item sm={6} md={4} lg={3} className={classes.gridItem}>
          <StaticProfile userId={this.props.match.params.userid} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  loading: state.post.loading,
  profile: state.auth.profile,
  auth: state.auth,
  post: state.post,
  errorMsg: state.post.errors,
  comment: state.comment
});
UserInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getUserInfo, clearProfile }
)(withStyles(styles)(UserInfo));
