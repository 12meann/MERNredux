import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
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
  root: {
    flexGrow: 1
  },
  brand: {
    // flexGrow: 1,
    justifyContent: "flex-start",
    fontSize: "20px"
  },
  button: {
    fontSize: "16px",
    height: "100%"
  },
  username: {
    textTransform: "none",
    fontSize: "16px"
  },
  links: {
    marginLeft: "auto"
  },
  icon: {
    position: "relative",
    top: 10
  }
};

class Navbar extends Component {
  render() {
    const {
      classes,
      history,
      logOut,
      auth: { isAuthenticated, user, loading }
    } = this.props;

    const guestLinks = (
      <div className={classes.links}>
        <Login />
        <SignUp />
      </div>
    );
    const authLinks = (
      <Fragment>
        {user ? (
          <div className={classes.links}>
            <AccountCircle fontSize="large" className={classes.icon} />
            <Button
              component={Link}
              className={classes.username}
              color="inherit"
              to={`/users/${user._id}`}
              variant="body1">
              Hi, @{user.username}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                logOut(history);
              }}>
              Logout
            </Button>
          </div>
        ) : null}
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
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

Navbar.propTypes = {
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  logOut: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    { logOut }
  ),
  withStyles(styles)
)(withRouter(Navbar));
