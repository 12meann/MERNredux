import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  CLOSE_REGISTER_MODAL,
  OPEN_UPDATE_MODAL,
  CLOSE_UPDATE_MODAL
} from "../actions/types";
import { clearErrors } from "./authActions";

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

// export const openUpdateModal = () => dispatch => {
//   dispatch({ type: OPEN_UPDATE_MODAL });
// };

// export const closeUpdateModal = () => dispatch => {
//   dispatch({ type: CLOSE_UPDATE_MODAL });
// };
