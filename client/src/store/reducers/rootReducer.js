import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  modal: modalReducer
});

export default rootReducer;
