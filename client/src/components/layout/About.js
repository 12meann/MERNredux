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
const About = ({ classes }) => {
  return (
    <Fragment>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        color="secondary"
        className={classes.title}
        gutterBottom>
        About
      </Typography>
      <Typography
        variant="body1"
        component="p"
        align="center"
        className={classes.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        quibusdam commodi ut maiores velit dolorem itaque accusantium reiciendis
        nobis, suscipit, perferendis aliquid ipsum voluptas laboriosam earum
        modi eligendi sint hic quis assumenda ipsa ea eos veniam. Similique et
        consequatur consequuntur impedit voluptatibus, modi iusto, illo eum
        perferendis nisi quas odit?
      </Typography>
    </Fragment>
  );
};
About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
