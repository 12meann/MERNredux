import React, { Component } from "react";
import { Link } from "react-router-dom";
//MUI
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "@material-ui/core/Button";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";

const styles = {
  root: {
    flexGrow: 1
  },
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
    const { classes } = this.props;
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
            <Login />

            <SignUp />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
