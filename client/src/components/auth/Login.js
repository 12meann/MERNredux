import React, { Component, Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

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

const styles = theme => ({
  form: {
    margin: "auto"
  },
  input: {
    padding: "20px auto"
  },
  button: {
    marginTop: "20px",
    position: "relative"
  },
  adornment: {
    marginBottom: "10px"
  },
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
  }
});

class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    errors: {},
    open: false,
    showPassword: false
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/login", user)
      .then(res => {
        localStorage.setItem("x-auth-token", res.data.token);
        console.log(res.data);
        this.setState({
          loading: false,
          open: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          errors: err.response.data
        });
      });
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };
  render() {
    const { open, email, password, showPassword, errors, loading } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Button color="inherit" onClick={this.handleClickOpen}>
          Login
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <Tooltip title="Close">
            <IconButton
              aria-label="Close"
              className={classes.closeIcon}
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <DialogTitle
            className={classes.title}
            id="form-dialog-title"
            align="center">
            Login
          </DialogTitle>
          {/* <DialogTitle id="form-dialog-subtitle">Mom's Daily Log</DialogTitle> */}

          <DialogContent>
            <form
              noValidate
              className={classes.form}
              onSubmit={this.handleSubmit}>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                onChange={this.handleChange}
                value={email}
                helperText={errors.email}
                error={errors.email ? true : false}
                fullWidth
                required
                className={classes.input}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      aria-label="User"
                      className={classes.adornment}>
                      {/* <IconButton
                        edge="end"
                        aria-label="User"
                        className={classes.icon}> */}
                      <AccountCircle />
                      {/* </IconButton> */}
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
                helperText={errors.password}
                error={errors.password ? true : false}
                type={showPassword ? "text" : "password"}
                onChange={this.handleChange}
                fullWidth
                required
                className={classes.input}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className={classes.icon}
                        edge="end"
                        tabIndex="-1"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {errors.msg && (
                <Typography
                  variant="body2"
                  align="center"
                  className={classes.errorMsg}>
                  {errors.msg}
                </Typography>
              )}
              <DialogActions className={classes.actions}>
                <Button
                  variant="contained"
                  type="submit"
                  className="button-dialog"
                  fullWidth
                  color="primary"
                  disabled={loading}
                  // onClick={this.handleClose}
                  size="large">
                  Login
                  {loading && (
                    <CircularProgress size={30} className={classes.spinner} />
                  )}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
