import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import modalReducer from "./modalReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  modal: modalReducer,
  comment: commentReducer
});

export default rootReducer;
