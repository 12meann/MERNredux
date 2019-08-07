import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteAccount,
  logOut,
  editProfile
} from "../../store/actions/authActions";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import DeleteProfileModal from "./DeleteProfileModal";

//MUI
import { loadCSS } from "fg-loadcss";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import EditProfileModal from "./EditProfileModal";

const styles = theme => ({
  moreButton: {
    float: "right"
  }
});

export class MoreProfileButton extends Component {
  state = {
    anchorEl: null,
    openDeleteModal: false,
    openEditModal: false,
    username: "",
    location: "",
    facebookLink: "",
    twitterLink: "",
    about: ""
  };
  //menu button
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
  //delete profile
  handleModalDelete = () => {
    const { openDeleteModal } = this.state;
    this.setState({
      openDeleteModal: !openDeleteModal,
      anchorEl: null
    });
  };
  handleDelete = e => {
    const userId = this.props.user._id;
    this.props.deleteAccount(userId);
    this.setState({
      openDeleteModal: false
    });
  };
  //edit profile
  handleModalEdit = () => {
    const { openEditModal } = this.state;
    this.setState({
      openEditModal: !openEditModal,
      anchorEl: null
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { username, location, facebookLink, twitterLink, about } = this.state;
    const { history, editProfile } = this.props;
    e.preventDefault();
    const formData = {
      username,
      location,
      facebookLink,
      twitterLink,
      about
    };
    editProfile(formData, history);
    this.setState({
      openEditModal: false
    });
  };
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    const { user, openLoginModal } = this.props;
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
    const {
      anchorEl,
      openDeleteModal,
      openEditModal,
      username,
      location,
      facebookLink,
      twitterLink,
      about
    } = this.state;
    const { classes, user, logOut } = this.props;
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
          {/* <MenuItem component={Link} to={`/users/${user._id}/edit`}>
            Edit Profile
          </MenuItem> */}
          <MenuItem
            onClick={this.handleModalEdit}
            className={classes.deleteMenu}>
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
        {/* delete dialog */}
        <DeleteProfileModal
          openDeleteModal={openDeleteModal}
          handleModalDelete={this.handleModalDelete}
          handleDelete={this.handleDelete}
        />
        {/* Edit dialog */}
        <EditProfileModal
          openEditModal={openEditModal}
          handleModalEdit={this.handleModalEdit}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          username={username}
          location={location}
          facebookLink={facebookLink}
          twitterLink={twitterLink}
          about={about}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.auth.errors
});

MoreProfileButton.propTypes = {
  user: PropTypes.object,
  deleteAccount: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    { deleteAccount, logOut, editProfile }
  ),
  withStyles(styles)
)(withRouter(MoreProfileButton));
