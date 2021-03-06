import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
import {
  openLoginModal,
  openRegisterModal,
  closeRegisterModal
} from "../../store/actions/modalActions";

//MUI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Face from "@material-ui/icons/Face";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiLink from "@material-ui/core/Link";

const styles = theme => ({
  actions: {
    padding: "20px 0"
  },
  errorMsg: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "10px"
  },
  spinner: {
    position: "absolute"
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10
  },
  title: {
    marginTop: 30
  },
  link: {
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer"
    }
  }
});

class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    errors: {},
    showPassword: false
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        errors: { confirmPassword: "Passwords must match" }
      });
    } else {
      const newUser = {
        email,
        password,
        username
      };
      this.props.registerUser(newUser);
    }
  };
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.errors && !nextProps.auth.loading) {
      this.setState({
        errors: {}
      });
    }
  }

  componentDidMount() {
    this.setState({
      errors: this.props.auth.errors
    });
  }
  handleOpenLoginModal = () => {
    this.props.closeRegisterModal();
    this.props.openLoginModal();
  };

  render() {
    const {
      email,
      password,
      username,
      confirmPassword,
      showPassword,
      errors
    } = this.state;
    const {
      openRegisterModal,
      closeRegisterModal,
      registerModalOpen,
      classes,
      auth: { loading }
    } = this.props;

    return (
      <Fragment>
        <Button color="inherit" onClick={openRegisterModal}>
          Sign Up
        </Button>
        <Dialog
          open={registerModalOpen}
          onClose={closeRegisterModal}
          fullScreen={window.innerWidth <= 500}
          aria-labelledby="form-dialog-title">
          <Tooltip title="Close">
            <IconButton
              aria-label="Close"
              className={classes.closeIcon}
              onClick={closeRegisterModal}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <DialogTitle
            className={classes.title}
            id="form-dialog-title"
            align="center">
            SignUp
          </DialogTitle>
          <DialogContent>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                onChange={this.handleChange}
                value={email}
                autoComplete="email"
                helperText={
                  errors ? (errors.email ? errors.email : null) : null
                }
                error={errors ? (errors.email ? true : false) : null}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      aria-label="User"
                      className={classes.adornment}>
                      <AccountCircle color="primary" />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                margin="dense"
                id="username"
                name="username"
                label="Username"
                type="text"
                autoComplete="username"
                onChange={this.handleChange}
                value={username}
                helperText={
                  errors ? (errors.username ? errors.username : null) : null
                }
                error={errors ? (errors.username ? true : false) : null}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      aria-label="User"
                      className={classes.adornment}>
                      <Face color="primary" />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Password"
                value={password}
                helperText={
                  errors ? (errors.password ? errors.password : null) : null
                }
                error={errors ? (errors.password ? true : false) : null}
                type={showPassword ? "text" : "password"}
                onChange={this.handleChange}
                fullWidth
                autoComplete="current-password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        tabIndex="-1"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}>
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                margin="dense"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                autoComplete="off"
                helperText={
                  errors
                    ? errors.confirmPassword
                      ? errors.confirmPassword
                      : null
                    : null
                }
                error={errors ? (errors.confirmPassword ? true : false) : null}
                type={showPassword ? "text" : "password"}
                onChange={this.handleChange}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        tabIndex="-1"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}>
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {errors
                ? errors.msg && (
                    <Typography
                      variant="body2"
                      align="center"
                      className={classes.errorMsg}>
                      {errors.msg}
                    </Typography>
                  )
                : null}
              <DialogActions className={classes.actions}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                  disabled={loading}
                  size="large">
                  Sign Up
                  {loading && (
                    <CircularProgress size={30} className={classes.spinner} />
                  )}
                </Button>
                <br />
                <br />
              </DialogActions>
              <Typography variant="body2" align="center" gutterBottom>
                <em>
                  Once you successfully register, your account will be logged
                  out after an hour for your security.
                </em>
              </Typography>
              <Typography variant="body2" align="center" gutterBottom>
                Already have an account?{" "}
                <MuiLink
                  color="secondary"
                  underline="none"
                  className={classes.link}
                  onClick={this.handleOpenLoginModal}>
                  Login here
                </MuiLink>
              </Typography>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    registerModalOpen: state.modal.registerModalOpen
  };
};

SignUp.propTypes = {
  auth: PropTypes.object.isRequired,
  registerModalOpen: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  closeRegisterModal: PropTypes.func.isRequired,
  openRegisterModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object
};

export default connect(
  mapStateToProps,
  {
    registerUser,
    openLoginModal,
    openRegisterModal,
    closeRegisterModal
  }
)(withStyles(styles)(SignUp));
