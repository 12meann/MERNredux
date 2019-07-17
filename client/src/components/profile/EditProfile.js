import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { editProfile } from "../../store/actions/authActions";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import FaceIcon from "@material-ui/icons/Face";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AboutIcon from "@material-ui/icons/PermContactCalendar";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  title: {
    marginTop: 30
  },
  skipButton: {
    fontSize: 12,

    "&:hover": {
      color: theme.palette.primary.main
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
  static propTypes = {
    editProfile: PropTypes.func,
    openUpdateModal: PropTypes.func,
    closeUpdateModal: PropTypes.func,
    closeMenu: PropTypes.func,
    updateModalOpen: PropTypes.bool
  };
  state = {
    username: "",
    location: "",
    facebookLink: "",
    twitterLink: "",
    about: ""
  };
  userDetailsToState = user => {
    this.setState({
      username: user.username ? user.username : "",
      about: user.about ? user.about : "",
      location: user.location ? user.location : "",
      facebookLink: user.facebookLink ? user.facebookLink : "",
      twitterLink: user.twitterLink ? user.twitterLink : ""
    });
  };
  handleUpdate = () => {
    console.log("hello");
    this.props.openUpdateModal();

    this.userDetailsToState(this.props.user);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { username, location, facebookLink, twitterLink, about } = this.state;
    e.preventDefault();
    const formData = {
      username,
      location,
      facebookLink,
      twitterLink,
      about
    };
    console.log(formData);
    this.props.editProfile(formData);
    this.props.closeUpdateModal();
  };
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    const { user } = this.props;
    this.userDetailsToState(user);
  }

  render() {
    let ref = React.createRef();
    const {
      classes,
      loading,

      errors
    } = this.props;
    const { username, location, facebookLink, twitterLink, about } = this.state;
    return (
      <Grid>
        <Grid item sm={12} md={8} className={classes.form}>
          <Typography className={classes.title} variant="h2" align="center">
            Edit / Update Profile
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <TextField
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              onChange={this.handleChange}
              defaultValue={username}
              // helperText={errors.username}
              // error={errors.username ? true : false}
              fullWidth
              required
              // className={classes.input}
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
              defaultValue={location}
              // helperText={errors.location}
              // error={errors.location ? true : false}
              fullWidth
              required
              // className={classes.input}
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
              defaultValue={about}
              // helperText={errors.about}
              // error={errors.about ? true : false}
              fullWidth
              required
              // className={classes.input}
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
              defaultValue={facebookLink}
              // helperText={errors.facebookLink}
              // error={errors.facebookLink ? true : false}
              fullWidth
              required
              // className={classes.input}
              InputProps={{
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
              defaultValue={twitterLink}
              // helperText={errors.twitterLink}
              // error={errors.twitterLink ? true : false}
              fullWidth
              required
              // className={classes.input}
              InputProps={{
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

            <Button
              variant="text"
              className={classes.skipButton}
              component={Link}
              to="/"
              color="secondary"
              size="large">
              Skip for now
            </Button>
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              // className={classes.deleteButton}
              color="primary"
              disabled={loading}
              size="large">
              Update Profile
              {loading && (
                <CircularProgress size={30} className={classes.spinner} />
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  updateModalOpen: state.modal.updateModalOpen,
  auth: state.auth,
  user: state.auth.user
});

export default compose(
  connect(
    mapStateToProps,
    { editProfile }
  ),
  withStyles(styles)
)(EditProfile);
