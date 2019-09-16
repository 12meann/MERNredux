import React, { Fragment } from "react";
import PropTypes from "prop-types";
//MUI
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  title: {
    paddingTop: 40
  },
  content: {
    display: "block",
    maxWidth: "50%",
    margin: "40px auto 0 auto"
  }
});
const Contact = ({ classes }) => {
  return (
    <Fragment>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        color="secondary"
        className={classes.title}
        gutterBottom>
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        component="p"
        align="center"
        className={classes.content}>
        SocialMediaApp by Me-ann
        <br />
        123-4567890
        <br />
        123 st North East New york, New York
        <br />
        dummycontact@momsdiary.com
      </Typography>
    </Fragment>
  );
};
Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contact);
