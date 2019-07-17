import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  CLOSE_REGISTER_MODAL
} from "../actions/types";

const initialState = {
  loginModalOpen: false,
  registerModalOpen: false,
  updateModalOpen: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        loginModalOpen: true
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        loginModalOpen: false
      };
    case OPEN_REGISTER_MODAL:
      return {
        ...state,
        registerModalOpen: true
      };
    case CLOSE_REGISTER_MODAL:
      return {
        ...state,
        registerModalOpen: false
      };

    default:
      return state;
  }
};

export default modalReducer;
