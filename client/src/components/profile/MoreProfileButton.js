import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, logOut } from "../../store/actions/authActions";
import { Link } from "react-router-dom";

//MUI
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";

const styles = theme => ({
  moreButton: {
    float: "right"
  },
  deleteMenu: {
    color: theme.palette.error.main
  },
  deleteButton: {
    borderColor: theme.palette.error.dark,
    color: "#000",
    "&:hover": {
      backgroundColor: theme.palette.error.main
    }
  },
  dialog: {
    padding: "20px",
    textAlign: "center"
  },
  spinner: {
    position: "absolute"
  },
  disabledButton: {
    backgroundColor: theme.palette.error.light
  }
});

export class MoreProfileButton extends Component {
  state = {
    anchorEl: null,
    openModal: false
  };

  handleClickMenu = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };
  handleCloseMenu = () => {
    this.setState({
      anchorEl: null
    });
  };
  handleModalDelete = () => {
    const { openModal } = this.state;
    this.setState({
      openModal: !openModal,
      anchorEl: null
    });
  };
  handleDelete = e => {
    const userId = this.props.user._id;
    this.props.deleteAccount(userId);
    this.setState({
      openModal: false
    });
  };

  render() {
    const { anchorEl, openModal } = this.state;
    const { classes, loading, user, logOut } = this.props;
    return (
      <Fragment>
        <IconButton
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleClickMenu}
          className={classes.moreButton}>
          <MoreVertIcon fontSize="large" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}>
          <MenuItem component={Link} to={`/users/${user._id}/`}>
            My posts
          </MenuItem>
          <MenuItem component={Link} to={`/users/${user._id}/edit`}>
            Edit Profile
          </MenuItem>
          {/* <MenuItem>Edit Profile Image</MenuItem> */}
          <MenuItem onClick={logOut}>Logout</MenuItem>
          <Divider variant="middle" />
          <MenuItem
            onClick={this.handleModalDelete}
            className={classes.deleteMenu}>
            Delete Account
          </MenuItem>
        </Menu>
        <Dialog
          open={openModal}
          onClose={this.handleModalDelete}
          aria-labelledby="Delete modal"
          className={classes.dialog}
          fullWidth
          maxWidth="sm">
          <DialogTitle id="Login" align="center">
            Delete Account
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant="h6">
              This is irreversable.
              <br />
              <br />
              Are you sure you want to delete your account?
              <br />
              <br />
              All your profile info will be deleted.
            </DialogContentText>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={this.handleDelete}
                className={classes.deleteButton}
                fullWidth
                disabled={loading}
                classes={{ disabled: classes.disabledButton }}
                size="large">
                DELETE
                {loading && (
                  <CircularProgress size={30} className={classes.spinner} />
                )}
              </Button>
              <Button
                variant="contained"
                onClick={this.handleModalDelete}
                fullWidth
                color="secondary"
                size="large">
                CANCEL
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user
});

MoreProfileButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  deleteAccount: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { deleteAccount, logOut }
)(withStyles(styles)(MoreProfileButton));
