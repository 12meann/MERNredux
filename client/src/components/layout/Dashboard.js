import React, { Component } from "react";
import Profile from "../profile/Profile";
import PostFeed from "../post/PostFeed";
import Message from "../layout/Message";

// import store from "../../store/store";
import { connect } from "react-redux";
import { compose } from "redux";
// import { openLoginModal } from "../../store/actions/modalActions";
//
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  dashboard: {
    margin: "0 20px"
  }
};

class Dashboard extends Component {
  render() {
    const { classes, msg } = this.props;

    return (
      <Grid container spacing={6} className={classes.dashboard}>
        {msg.success || msg.fail ? <Message /> : null}
        <Grid item xs={12} sm={7}>
          <PostFeed />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  msg: state.auth
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Dashboard);
