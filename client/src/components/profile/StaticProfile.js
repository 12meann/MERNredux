import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import MoreProfileButton from "./MoreProfileButton";
import LikeUser from "./LikeUser";
import LoadingProfile from "../layout/LoadingProfile";
//MUI
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import MuiLink from "@material-ui/core/Link";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RoomIcon from "@material-ui/icons/Room";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LinkIcon from "@material-ui/icons/Link";

const styles = theme => ({
  card: {
    position: "relative",
    textAlign: "center",
    padding: 20
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
    width: 300,
    height: 300,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
    margin: "0 auto"
  },
  about: {
    textAlign: "justify",
    lineHeight: "1.85rem"
  },
  heart: {
    color: theme.palette.secondary.light
  }
});

class StaticProfile extends Component {
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }
  render() {
    const { classes, loading, profile, user } = this.props;
    return (
      <Fragment>
        {loading ? (
          <LoadingProfile />
        ) : profile ? (
          <Card className={classes.card}>
            {user._id === profile._id ? <MoreProfileButton /> : null}
            <CardMedia
              className={classes.img}
              component="img"
              alt="no user image"
              image={profile.image}
              title="user image"
            />
            <CardContent className={classes.content}>
              <LikeUser userId={this.props.userId} />
              <Divider />
              <br />
              <Typography variant="h6" color="textSecondary" component="p">
                <AccountBoxIcon className={classes.icon} />{" "}
                <strong>@{profile.username ? profile.username : null} </strong>
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="span">
                <CalendarTodayIcon className={classes.icon} /> Member Since{" "}
                {moment(profile.registeredDate).format("MMM Do YY")}
              </Typography>
              {profile.location ? (
                <Typography variant="body1" color="textSecondary">
                  <RoomIcon className={classes.icon} /> Location:{" "}
                  {profile.location}
                </Typography>
              ) : null}
              <br />

              {profile.facebookLink || profile.twitterLink ? (
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

              {profile.facebookLink ? (
                <Typography variant="body1" color="textSecondary">
                  <Icon
                    className={clsx("fab fa-facebook-square", classes.icon)}
                  />{" "}
                  <MuiLink
                    href={`https://www.facebook.com/${profile.facebookLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    className={classes.link}>
                    facebook.com/{profile.facebookLink}
                  </MuiLink>
                </Typography>
              ) : null}
              {profile.twitterLink ? (
                <Typography variant="body1" color="textSecondary">
                  <Icon
                    className={clsx("fab fa-twitter-square", classes.icon)}
                  />{" "}
                  <MuiLink
                    href={`https://www.twitter.com/${profile.twitterLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    className={classes.link}>
                    twitter.com/{profile.twitterLink}
                  </MuiLink>
                </Typography>
              ) : null}
              <br />
              {profile.about ? (
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
                    {profile.about}
                  </Typography>
                </Fragment>
              ) : null}
            </CardContent>
          </Card>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user,
  profile: state.auth.profile
});

StaticProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(StaticProfile));
