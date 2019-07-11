import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import setToken from "./utilities/setToken";
//MUI
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import myTheme from "./utilities/theme";
import Navbar from "./components/layout/Navbar";

const theme = createMuiTheme(myTheme);

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
