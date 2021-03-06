import React from "react";
import PropTypes from "prop-types";
import ProfileFeed from "../profile/ProfileFeed";
import PostFeed from "../post/PostFeed";
import Message from "../layout/Message";
import { connect } from "react-redux";

//MUI Stuff
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  dashboard: {
    margin: "0 auto",
    padding: 20,
    paddingTop: 40
  },
  gridItem: {
    width: "100%",
    margin: "0 auto"
  }
});

const Dashboard = ({ classes, auth, post, comment }) => {
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
        <PostFeed />
      </Grid>
      <Grid item sm={6} md={4} lg={3} className={classes.gridItem}>
        <ProfileFeed />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  comment: state.comment
});
Dashboard.propTypes = {
  auth: PropTypes.object,
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
