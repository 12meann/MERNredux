import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItemCard from "../post/PostItemCard";
import { connect } from "react-redux";
import { getUserInfo } from "../../store/actions/postActions";
import StaticProfile from "./StaticProfile";
import axios from "axios";
import Message from "../layout/Message";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

const styles = {
  dashboard: {
    margin: "0 auto",
    padding: 20
  },
  gridItem: {
    width: "100%",
    margin: "0 auto"
  }
};

class UserInfo extends Component {
  state = {
    profile: null
  };
  componentDidMount() {
    const userId = this.props.match.params.userid;
    this.props.getUserInfo(userId);
    axios.get(`/api/users/${userId}`).then(res => {
      this.setState({
        profile: res.data.user
      });
    });
  }
  render() {
    const { loading, posts, classes, msg, post, comment } = this.props;
    const { profile } = this.state;
    const userPosts = !loading ? (
      posts.length === 0 ? (
        <Typography align="center">No posts found yet.</Typography>
      ) : (
        posts.map(post => <PostItemCard post={post} key={post._id} />)
      )
    ) : (
      <Typography component="p" align="center">
        Loading...
      </Typography>
    );
    return (
      <Grid container className={classes.dashboard}>
        {msg.success ||
        msg.fail ||
        post.success ||
        comment.success ||
        post.fail ||
        comment.error ? (
          <Message />
        ) : null}
        <Grid item sm={12} md={7} className={classes.gridItem}>
          {userPosts}
        </Grid>
        <Grid item sm={6} md={4} lg={3} className={classes.gridItem}>
          <StaticProfile profile={profile} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  loading: state.post.loading,
  msg: state.auth,
  post: state.post,
  errorMsg: state.post.errors,
  comment: state.comment
});
UserInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  getUserInfo: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getUserInfo }
)(withStyles(styles)(UserInfo));
