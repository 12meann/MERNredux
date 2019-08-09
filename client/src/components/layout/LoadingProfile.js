import React from "react";
import PropTypes from "prop-types";

import noUserImg from "../../images/blankAvatar.png";
//MUI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";

const styles = () => ({
  profile: {
    textAlign: "center",
    padding: "60px 20px"
  },
  image: {
    borderRadius: "50%"
  },

  fullLine: {
    height: "25px",
    backgroundColor: "#D1EEEE",
    width: "100%",
    margin: "20px auto",
    borderRadius: "10px"
  },
  halfLine: {
    height: "25px",
    backgroundColor: "#ADEAEA",
    width: "50%",
    margin: "20px auto",
    borderRadius: "5px"
  }
});

const LoadingProfile = ({ classes }) => {
  return (
    <Card className={classes.profile}>
      <CardMedia
        className={classes.image}
        component="img"
        alt="no user image"
        image={noUserImg}
        title="no user image"
      />
      <div className={classes.halfLine} />
      <Divider />
      <div className={classes.fullLine} />
      <div className={classes.halfLine} />
      <div className={classes.fullLine} />
      <Divider />
      <div className={classes.halfLine} />
      <div className={classes.fullLine} />
      <div className={classes.halfLine} />
    </Card>
  );
};

LoadingProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoadingProfile);
