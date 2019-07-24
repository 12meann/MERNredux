import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { loginUser } from "../../store/actions/authActions";
import {
  openLoginModal,
  closeLoginModal,
  openRegisterModal
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

class Login extends Component {
  state = {
    email: "",
    password: "",
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
    const { email, password } = this.state;
    const { history } = this.props;
    const userData = {
      email,
      password
    };
    this.props.loginUser(userData, history);
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };
  handleOpenRegisterModal = () => {
    this.props.closeLoginModal();

    this.props.openRegisterModal();
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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

  render() {
    const { email, password, showPassword, errors } = this.state;
    const {
      classes,
      openLoginModal,
      closeLoginModal,
      loginModalOpen,
      auth: { loading }
    } = this.props;
    return (
      <Fragment>
        <Button color="inherit" onClick={openLoginModal}>
          Login
        </Button>
        <Dialog
          open={loginModalOpen}
          onClose={closeLoginModal}
          aria-labelledby="Login modal">
          <Tooltip title="Close">
            <IconButton
              aria-label="Close"
              className={classes.closeIcon}
              onClick={closeLoginModal}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <DialogTitle className={classes.title} id="Login" align="center">
            Login
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
                helperText={
                  errors ? (errors.email ? errors.email : null) : null
                }
                error={errors ? (errors.email ? true : false) : null}
                autoComplete="email"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" aria-label="User">
                      <AccountCircle color="primary" />
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
              {errors
                ? errors.msg && (
                    <Typography variant="body2" align="center" color="error">
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
                  Login
                  {loading && (
                    <CircularProgress size={30} className={classes.spinner} />
                  )}
                </Button>
              </DialogActions>
              <Typography variant="body2" align="center" gutterBottom>
                Don't have an account yet?{" "}
                <MuiLink
                  color="secondary"
                  underline="none"
                  className={classes.link}
                  onClick={this.handleOpenRegisterModal}>
                  Register here!
                </MuiLink>
              </Typography>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  loginModalOpen: state.modal.loginModalOpen
});

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginModalOpen: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  openRegisterModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loginUser, openLoginModal, closeLoginModal, openRegisterModal }
  )
)(withRouter(Login));
