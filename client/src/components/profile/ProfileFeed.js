import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import MoreProfileButton from "./MoreProfileButton";
import LoadingProfile from "../layout/LoadingProfile";
import { editImage } from "../../store/actions/authActions";
import { getPostsFeed } from "../../store/actions/postActions";

//MUI
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MuiLink from "@material-ui/core/Link";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RoomIcon from "@material-ui/icons/Room";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LinkIcon from "@material-ui/icons/Link";
import Icon from "@material-ui/core/Icon";
import EditImage from "./EditImage";
import { CircularProgress } from "@material-ui/core";

const styles = theme => ({
  card: {
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
    margin: "0 auto",
    clear: "both"
  },
  imgLoad: {
    opacity: "0.6"
  },
  about: {
    textAlign: "justify",
    lineHeight: "1.85rem"
  },
  link: {
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  heart: {
    color: theme.palette.secondary.light
  },
  imgIcon: {
    position: "relative",
    top: "-35px",
    right: "-120px"
  }
});

class Profile extends Component {
  handleClickEdit = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleEditImage = e => {
    const userId = this.props.user._id;
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    this.props.editImage(userId, formData);
  };
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }
  render() {
    const { user, classes, loading } = this.props;
    return (
      <Fragment>
        {user ? (
          <Card className={classes.card}>
            <MoreProfileButton
              handleClickEdit={this.handleClickEdit}
              handleEditImage={this.handleEditImage}
            />
            {loading ? (
              <CardMedia
                className={clsx(classes.imgLoad, classes.img)}
                component="img"
                alt="uploading.ln image"
                image={user.image}
                title="user image"
              />
            ) : (
              <CardMedia
                className={classes.img}
                component="img"
                alt="no user image"
                image={user.image}
                title="user image"
              />
            )}

            <EditImage
              handleClickEdit={this.handleClickEdit}
              handleEditImage={this.handleEditImage}
            />

            <CardContent className={classes.content}>
              <small className={classes.heart}>
                {user.likes
                  ? user.likes.length === 1
                    ? `${user.likes.length} like`
                    : user.likes.length > 0
                    ? `${user.likes.length} likes`
                    : `0 like`
                  : `0 like`}
              </small>
              <br />
              <br />
              <Divider />
              <br />
              <Typography variant="h6" color="textSecondary" component="p">
                <AccountBoxIcon className={classes.icon} />{" "}
                <strong>@{user.username} </strong>
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
          <LoadingProfile />
        ) : null}
      </Fragment>
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
  connect(
    mapStateToProps,
    { editImage, getPostsFeed }
  ),
  withStyles(styles)
)(Profile);
