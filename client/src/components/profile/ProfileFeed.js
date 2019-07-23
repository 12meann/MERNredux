import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import noUserImg from "../../images/blankAvatar.png";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import MoreProfileButton from "./MoreProfileButton";

//MUI
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RoomIcon from "@material-ui/icons/Room";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LinkIcon from "@material-ui/icons/Link";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import MuiLink from "@material-ui/core/Link";

const styles = theme => ({
  card: {
    position: "relative",
    textAlign: "center",
    padding: 20
  },
  progress: {
    postion: "absolute"
  },

  icon: {
    position: "relative",
    top: theme.spacing(0.7),
    width: theme.typography.display3,
    height: theme.typography.display3,
    color: theme.palette.secondary.light
  },
  connect: {
    transform: "rotate(45deg)"
  },
  img: {
    borderRadius: "50%"
  },
  about: {
    textAlign: "justify",
    lineHeight: "1.85rem"
  },
  link: {
    "&:hover": {
      color: theme.palette.secondary.light
    }
  }
});

class Profile extends Component {
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }
  render() {
    const {
      user,

      classes,
      loading
    } = this.props;
    return (
      <div>
        {user ? (
          <Card className={classes.card}>
            <MoreProfileButton />
            <CardMedia
              className={classes.img}
              component="img"
              alt="no user image"
              // height="140"
              image={noUserImg}
              title="no user image"
            />
            <CardContent className={classes.content}>
              <Typography variant="h6" color="textSecondary" component="p">
                <AccountBoxIcon className={classes.icon} />{" "}
                <strong>@ {user.username} </strong>
                <span>{user.likes ? user.likes.length : 0} likes</span>
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="span">
                <CalendarTodayIcon className={classes.icon} /> Member Since{" "}
                {moment(user.registeredDate).format("MMM Do YY")}
              </Typography>
              {user.location ? (
                <Typography variant="body1" color="textSecondary">
                  <RoomIcon className={classes.icon} /> Location:{" "}
                  {user.location}
                </Typography>
              ) : null}
              <br />

              {user.facebookLink || user.twitterLink ? (
                <Fragment>
                  <Divider />
                  <br />
                  <Typography variant="body1" color="textSecondary">
                    {" "}
                    <LinkIcon
                      className={clsx(classes.icon, classes.connect)}
                    />{" "}
                    <strong> Let's connect! </strong>
                  </Typography>
                </Fragment>
              ) : null}

              {user.facebookLink ? (
                <Typography variant="body1" color="textSecondary">
                  <Icon
                    className={clsx("fab fa-facebook-square", classes.icon)}
                  />{" "}
                  <MuiLink
                    href={`https://www.facebook.com/${user.facebookLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    className={classes.link}>
                    facebook.com/{user.facebookLink}
                  </MuiLink>
                </Typography>
              ) : null}
              {user.twitterLink ? (
                <Typography variant="body1" color="textSecondary">
                  <Icon
                    className={clsx("fab fa-twitter-square", classes.icon)}
                  />{" "}
                  <MuiLink
                    href={`https://www.twitter.com/${user.twitterLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    className={classes.link}>
                    twitter.com/{user.twitterLink}
                  </MuiLink>
                </Typography>
              ) : null}
              <br />
              {user.about ? (
                <Fragment>
                  <Divider />

                  <br />
                  <Typography variant="body1" color="textSecondary">
                    <PermIdentityIcon className={classes.icon} />{" "}
                    <strong> About me: </strong>
                    <br />
                    <br />
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    {user.about}
                  </Typography>
                </Fragment>
              ) : null}
            </CardContent>
          </Card>
        ) : loading ? (
          <CircularProgress size={250} className={classes.progress} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});

Profile.propTypes = {
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Profile);
