import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./store/actions/authActions";
import PrivateRoute from "./utilities/PrivateRoute";
import store from "./store/store";

//links
import Dashboard from "./components/layout/Dashboard";
import Post from "./components/post/Post";
import EditProfile from "./components/profile/EditProfile";
import Navbar from "./components/layout/Navbar";
//MUI
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import myTheme from "./utilities/theme";

const theme = createMuiTheme(myTheme);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <PrivateRoute path="/users/:userid" component={EditProfile} />
                <PrivateRoute path="/posts/:postid" component={Post} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
