import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

import { connect } from "react-redux";

import { getAllUsers } from "../../store/actions/authActions";

const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.secondary.main,
    height: "80px"
  },
  links: {
    color: "white",
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer"
    }
  }
});

export class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer
        // position="fixed"
        className={classes.appBar}
        // component="footer"
        // color="secondary"
      >
        {/* <Toolbar> */}

        <Typography align="center" className={classes.links} gutterBottom>
          <MuiLink
            component={Link}
            to="/"
            underline="none"
            className={classes.links}>
            Home ||{" "}
          </MuiLink>
          <MuiLink
            component={Link}
            to="/"
            underline="none"
            className={classes.links}>
            About ||{" "}
          </MuiLink>
          <MuiLink
            component={Link}
            to="/"
            underline="none"
            className={classes.links}>
            Contact ||{" "}
          </MuiLink>
          <MuiLink
            component={Link}
            to="/users"
            underline="none"
            onClick={() => getAllUsers()}
            className={classes.links}>
            Members{" "}
          </MuiLink>
        </Typography>
        <Typography
          align="center"
          variant="subtitle2"
          gutterBottom
          className={classes.links}>
          © MommyDiaries 2019
        </Typography>
        {/* </Toolbar> */}
      </footer>
    );
  }
}

export default connect(
  null,
  { getAllUsers }
)(withStyles(styles)(Footer));
