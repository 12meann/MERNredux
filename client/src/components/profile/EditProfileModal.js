import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//MUI
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import FaceIcon from "@material-ui/icons/Face";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AboutIcon from "@material-ui/icons/PermContactCalendar";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  title: {
    marginTop: 30
  },
  buttons: {
    float: "right",
    margin: "30px 0"
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
  },
  dialog: {
    padding: "20px"
  },
  spinner: {
    marginLeft: "10px"
  }
});

const EditProfileModal = ({
  classes,
  loading,
  errors,
  username,
  location,
  facebookLink,
  twitterLink,
  about,
  openEditModal,
  handleModalEdit,
  handleSubmit,
  handleChange
}) => {
  return (
    <Dialog
      open={openEditModal}
      onClose={handleModalEdit}
      fullScreen={window.innerWidth <= 500}
      aria-labelledby="Edit modal"
      fullWidth
      className={classes.dialog}
      maxWidth="md">
      <DialogTitle id="Edit" align="center">
        Edit / Update Profile
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            value={facebookLink}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" tabIndex="-1">
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
            onChange={handleChange}
            value={twitterLink}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" tabIndex="-1">
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
              onClick={handleModalEdit}
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
      </DialogContent>
    </Dialog>
  );
};

EditProfileModal.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  username: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  facebookLink: PropTypes.string.isRequired,
  twitterLink: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  openEditModal: PropTypes.bool.isRequired,
  handleModalEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(EditProfileModal);
