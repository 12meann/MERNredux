import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import clsx from "clsx";
import { connect } from "react-redux";
import { compose } from "redux";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import { logOut } from "../../store/actions/authActions";
//MUI
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { Drawer } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  brand: {
    justifyContent: "flex-start",
    fontSize: "20px"
  },
  button: {
    fontSize: "16px",
    height: "100%",
    padding: "0 17px 0 12px"
  },
  username: {
    textTransform: "none",
    fontSize: "16px"
  },
  links: {
    marginLeft: "auto",
    "& ul": {
      padding: 0,
      margin: 0,
      [theme.breakpoints.up("md")]: {
        display: "flex"
      },
      "& li": {
        listStyle: "none"
        // "&:hover": {
        //   backgroundColor: theme.palette.secondary.dark
        // }
      }
    },
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      width: "100%",
      height: "calc(100vh-50px)",
      background: theme.palette.secondary.main,
      top: "50px",
      left: "-100%",
      transition: "0.5s",
      "& ul": {
        padding: 0,
        margin: 0,
        "& li": {
          display: "block",
          textAlign: "center"
          // "&:hover": {
          //   backgroundColor: theme.palette.secondary.dark
          // }
        }
      }
    }
  },
  mobile: {
    left: 0
  },
  text: {
    padding: "10px",
    position: "relative",
    top: "-10px"
  },
  logOut: {
    position: "relative",
    top: "3px"
  },
  menuIcon: {
    cursor: "pointer",
    marginLeft: "auto",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  }
});

class Navbar extends Component {
  state = {
    isMobile: false
  };
  handleLogOut = () => {
    const { history, logOut } = this.props;
    logOut();
    history.push("/");
  };
  handleMobile = () => {
    this.setState({
      isMobile: !this.state.isMobile
    });
  };

  render() {
    const { isMobile } = this.state;
    const {
      classes,
      auth: { isAuthenticated, user, loading }
    } = this.props;

    const guestLinks = (
      <div className={clsx(classes.links, isMobile ? classes.mobile : "")}>
        <ul>
          <li>
            <Login />
          </li>
          <li>
            <SignUp />
          </li>
        </ul>
      </div>
    );
    const authLinks = (
      <Fragment>
        {user ? (
          <div className={clsx(classes.links, isMobile ? classes.mobile : "")}>
            <ul>
              <li>
                <AccountCircle fontSize="large" />
                <Typography className={classes.text} component="span">
                  Hi, @{user.username}
                </Typography>
              </li>
              <li>
                <Button
                  className={classes.logOut}
                  color="inherit"
                  onClick={this.handleLogOut}>
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        ) : null}
      </Fragment>
    );
    return (
      <header className={classes.root}>
        <AppBar color="secondary">
          <Toolbar className={classes.button} component="nav">
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
            <MenuIcon
              className={classes.menuIcon}
              onClick={this.handleMobile}
            />
          </Toolbar>
        </AppBar>
      </header>
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
