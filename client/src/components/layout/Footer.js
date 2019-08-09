import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

const styles = theme => ({
  appBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: "auto",
    backgroundColor: theme.palette.secondary.main
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
        <Container>
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
        </Container>
        {/* </Toolbar> */}
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
