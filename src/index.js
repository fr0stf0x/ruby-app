import React from "react";
import ReactDOM from "react-dom";
import history from "./history";
import { Route, Router, Switch } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                exact
                key={key}
                component={prop.component}
              />
            );
          })}
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById("root")
);
