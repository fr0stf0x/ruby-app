import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";
import ScrollToTop from "./ScrollToTop";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <ScrollToTop>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} exact key={key} component={prop.component}/>;
        })}
      </Switch>
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);