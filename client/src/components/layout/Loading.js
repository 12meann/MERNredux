import React, { Fragment } from "react";
import PropTypes from "prop-types";
import noUserImg from "../../images/blankAvatar.png";

//MUI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { CardHeader } from "@material-ui/core";

const styles = () => ({
  post: {
    padding: "10px 30px",
    margin: "20px 0"
  },
  image: {
    borderRadius: "50%"
  },

  fullLine: {
    height: "20px",
    backgroundColor: "#D1EEEE",
    width: "80%",
    margin: "10px 0",
    borderRadius: "10px"
  },
  halfLine: {
    height: "20px",
    backgroundColor: "#D1EEEE",
    width: "30%",
    margin: "10px 0",
    borderRadius: "10px"
  },
  small: {
    height: "10px",
    backgroundColor: "#D1EEEE",
    width: "30%",
    margin: "8px",
    borderRadius: "5px"
  },
  tiny: {
    height: "10px",
    backgroundColor: "#D1EEEE",
    width: "20%",
    margin: "8px",
    borderRadius: "5px"
  }
});

const Loading = ({ classes }) => {
  return (
    <Fragment>
      <Card className={classes.post}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Loading Image"
              src={noUserImg}
              alt="loading image"
            />
          }
          title={<div className={classes.small} />}
          subheader={<div className={classes.tiny} />}
        />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </Card>
      <Card className={classes.post}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Loading Image"
              src={noUserImg}
              alt="Loading image"
            />
          }
          title={<div className={classes.small} />}
          subheader={<div className={classes.tiny} />}
        />

        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </Card>
      <Card className={classes.post}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Loading Image"
              src={noUserImg}
              alt="Loading image"
            />
          }
          title={<div className={classes.small} />}
          subheader={<div className={classes.tiny} />}
        />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </Card>
    </Fragment>
  );
};

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
