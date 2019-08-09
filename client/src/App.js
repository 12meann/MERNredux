import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./store/actions/authActions";
import PrivateRoute from "./utilities/PrivateRoute";
import store from "./store/store";
//components
import Dashboard from "./components/layout/Dashboard";
import UserInfo from "./components/profile/UserInfo";
import Navbar from "./components/layout/Navbar";
import Members from "./components/layout/Members";
//MUI
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import myTheme from "./utilities/theme";
import Footer from "./components/layout/Footer";

const theme = createMuiTheme(myTheme);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Router>
            <Navbar />

            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/users" component={Members} />
                <PrivateRoute
                  exact
                  path="/users/:userid"
                  component={UserInfo}
                />
              </Switch>
              <Footer />
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
