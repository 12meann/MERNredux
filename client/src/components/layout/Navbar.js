import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import { logOut } from "../../store/actions/authActions";
//MUI
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = {
  // root: {
  //   flexGrow: 1
  // },
  brand: {
    flexGrow: 1,
    justifyContent: "flex-start",
    fontSize: "20px"
  },
  button: {
    fontSize: "16px"
  }
};

class Navbar extends Component {
  render() {
    const { classes, isAuthenticated, user, logOut } = this.props;

    const guestLinks = (
      <Fragment>
        <Login />
        <SignUp />
      </Fragment>
    );
    const authLinks = (
      <Fragment>
        {user ? (
          <Fragment>
            <AccountCircle />
            <Typography variant="body1">Hi, {user.username}</Typography>
          </Fragment>
        ) : null}
        <Button color="inherit" onClick={logOut}>
          Logout
        </Button>
      </Fragment>
    );
    return (
      <div className={classes.root}>
        <AppBar color="secondary">
          <Toolbar className={classes.button}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              className={classes.brand}>
              Mom's diary
            </Button>
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

Navbar.propTypes = {
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  logOut: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { logOut }
)(withStyles(styles)(Navbar));
