import axios from "axios";

let isAuthenticated;
const setToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    isAuthenticated = true;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    isAuthenticated = false;
  }
};

export default setToken;
