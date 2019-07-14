import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  CLOSE_REGISTER_MODAL
} from "../actions/types";

export const openLoginModal = () => dispatch => {
  dispatch({ type: OPEN_LOGIN_MODAL });
};

export const closeLoginModal = () => dispatch => {
  dispatch({ type: CLOSE_LOGIN_MODAL });
};

export const openRegisterModal = () => dispatch => {
  dispatch({ type: OPEN_REGISTER_MODAL });
};

export const closeRegisterModal = () => dispatch => {
  dispatch({ type: CLOSE_REGISTER_MODAL });
};
