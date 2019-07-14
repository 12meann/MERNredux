import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Login from "../components/auth/Login";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  modalOpen = true,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  modalOpen: state.modal.modalOpen
});

export default connect(mapStateToProps)(PrivateRoute);
