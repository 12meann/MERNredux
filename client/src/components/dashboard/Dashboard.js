import React, { Component } from "react";
import Profile from "./Profile";
import PostFeed from "./PostFeed";
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
    const { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.dashboard}>
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

export default withStyles(styles)(Dashboard);
