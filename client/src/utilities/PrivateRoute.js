import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openLoginModal } from "../store/actions/modalActions";

const PrivateRoute = ({
  openLoginModal,
  loadUser,
  component: Component,
  isAuthenticated,
  loading,
  modalOpen = true,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? openLoginModal() : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  openLoginModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { openLoginModal }
)(PrivateRoute);
