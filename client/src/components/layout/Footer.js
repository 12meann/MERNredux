import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.secondary.main,
    height: "100px",
    // position: "relative",
    // marginTop: "-80px"
    padding: "20px",
    marginTop: "auto"
  },
  white: {
    color: "white"
  },
  links: {
    color: "white",
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer"
    },
    paddingTop: 10
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer
        // position="fixed"
        className={classes.footer}
        component="footer"
        // color="secondary"
      >
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
            to="/about"
            underline="none"
            className={classes.links}>
            About ||{" "}
          </MuiLink>
          <MuiLink
            component={Link}
            to="/contact"
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
          className={classes.white}
          gutterBottom>
          © MommyDiaries 2019
        </Typography>
      </footer>
    );
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
