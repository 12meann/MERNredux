import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import modalReducer from "./modalReducer";
// import { LOGOUT_SUCCESS } from "../actions/types";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  modal: modalReducer
});

// const rootReducer = (state, action) => {
//   if (action.type === LOGOUT_SUCCESS) {
//     state = undefined;
//   }

//   return appReducer(state, action);
// };

export default rootReducer;
