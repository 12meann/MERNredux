import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  title: {
    paddingTop: 40
  },
  content: {
    display: "block",
    maxWidth: "50%",
    margin: "40px auto 0 auto"
  },
  link: {
    "&:hover": {
      color: theme.palette.secondary.main
    }
  }
});
const NotFound = ({ classes }) => {
  return (
    <Fragment>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        className={classes.title}
        gutterBottom>
        Page Not found
      </Typography>
      <Typography
        variant="h6"
        component="p"
        align="center"
        className={classes.content}>
        Oops! I think you're lost. Return to{" "}
        <MuiLink
          className={classes.link}
          component={Link}
          underline="none"
          to="/">
          Homepage
        </MuiLink>
      </Typography>
    </Fragment>
  );
};

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);
