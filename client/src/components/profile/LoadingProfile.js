import React from "react";
import noUserImg from "../../images/blankAvatar.png";
//MUI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  profile: {
    // height: "700px",
    textAlign: "center",
    padding: "60px 20px"
  },
  image: {
    borderRadius: "50%"
    // height: 20,
    // backgroundColor: theme.palette.secondary.light,
    // width: 60,
    // margin: "0 auto 7px auto"
  },

  fullLine: {
    height: "20px",
    backgroundColor: "#e8f4f8",
    width: "100%",
    margin: "20px auto"
  },
  halfLine: {
    height: "20px",
    backgroundColor: "#e8f4f8",
    width: "50%",
    margin: "20px auto"
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
      <div className={classes.halfLine} />
      <div className={classes.fullLine} />
      <div className={classes.halfLine} />
      <Divider />
      <div className={classes.halfLine} />
      <div className={classes.fullLine} />
      <div className={classes.halfLine} />
    </Card>
  );
};

export default withStyles(styles)(LoadingProfile);
