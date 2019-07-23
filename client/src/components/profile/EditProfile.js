import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { editProfile } from "../../store/actions/authActions";
import Message from "../layout/Message";

import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import FaceIcon from "@material-ui/icons/Face";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AboutIcon from "@material-ui/icons/PermContactCalendar";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { openLoginModal } from "../../store/actions/modalActions";

const styles = theme => ({
  title: {
    marginTop: 30
  },
  buttons: {
    float: "right",
    marginTop: 30
  },
  skipButton: {
    fontSize: 12,
    backgroundColor: "transparent",
    "&:hover": {
      color: theme.palette.primary.dark,
      backgroundColor: "transparent"
    }
  },
  form: {
    margin: "0 auto",
    padding: 20
  },
  adornment: {
    marginBottom: "10px"
  }
});

export class EditProfile extends Component {
  state = {
    username: "",
    location: "",
    facebookLink: "",
    twitterLink: "",
    about: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { username, location, facebookLink, twitterLink, about } = this.state;
    const { history } = this.props;
    e.preventDefault();
    const formData = {
      username,
      location,
      facebookLink,
      twitterLink,
      about
    };
    console.log("formdata", formData);
    this.props.editProfile(formData, history);
  };
  componentDidMount() {
    console.log(this.props.user, "as it mounts");
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    const { user } = this.props;
    user
      ? this.setState({
          username: user.username ? user.username : "",
          about: user.about ? user.about : "",
          location: user.location ? user.location : "",
          facebookLink: user.facebookLink ? user.facebookLink : "",
          twitterLink: user.twitterLink ? user.twitterLink : ""
        })
      : openLoginModal();
  }

  render() {
    console.log(this.props);
    const { classes, loading, errors } = this.props;
    const { username, location, facebookLink, twitterLink, about } = this.state;
    return (
      <Grid>
        {errors ? errors.error ? <Message /> : null : null}
        <Grid item sm={12} md={6} className={classes.form}>
          <Typography className={classes.title} variant="h2" align="center">
            Edit / Update Profile
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              onChange={this.handleChange}
              value={username}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    aria-label="User"
                    className={classes.adornment}>
                    <FaceIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="dense"
              id="location"
              name="location"
              label="Location"
              type="text"
              tabIndex="0"
              onChange={this.handleChange}
              value={location}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    aria-label="User"
                    className={classes.adornment}>
                    <LocationOnIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="dense"
              id="about"
              name="about"
              label="About you"
              type="text"
              multiline
              tabIndex="0"
              onChange={this.handleChange}
              value={about}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    aria-label="User"
                    className={classes.adornment}>
                    <AboutIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="dense"
              id="facebookLink"
              name="facebookLink"
              label="Facebook Link"
              type="text"
              tabIndex="0"
              onChange={this.handleChange}
              value={facebookLink}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    https://facebook.com/
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    aria-label="User"
                    className={classes.adornment}>
                    <Icon
                      className={clsx("fab fa-facebook-square")}
                      color="primary"
                    />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="dense"
              id="twitterLink"
              name="twitterLink"
              label="Twitter Link"
              type="text"
              tabIndex="0"
              onChange={this.handleChange}
              value={twitterLink}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    https://twitter.com/
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    aria-label="User"
                    className={classes.adornment}>
                    <Icon
                      className={clsx("fab fa-twitter-square")}
                      color="primary"
                    />
                  </InputAdornment>
                )
              }}
            />
            <div className={classes.buttons}>
              <Button
                variant="text"
                className={classes.skipButton}
                component={Link}
                to="/"
                color="primary"
                size="large">
                Skip for now
              </Button>
              <Button
                variant="contained"
                type="submit"
                // className={classes.deleteButton}
                color="primary"
                disabled={loading}
                size="large">
                Update Profile
                {loading && (
                  <CircularProgress size={30} className={classes.spinner} />
                )}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  updateModalOpen: state.modal.updateModalOpen,
  errors: state.auth.errors,
  user: state.auth.user
});

EditProfile.propTypes = {
  editProfile: PropTypes.func,
  openUpdateModal: PropTypes.func,
  closeUpdateModal: PropTypes.func,
  closeMenu: PropTypes.func,
  updateModalOpen: PropTypes.bool
};

export default compose(
  connect(
    mapStateToProps,
    { editProfile }
  ),
  withStyles(styles)
)(EditProfile);
