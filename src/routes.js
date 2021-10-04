import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from "./components";
import { Login, MainPage, Medicines, Orders, Teams } from "./pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={MainPage} />
        <PrivateRoute path="/medicines" exact component={Medicines} />
        <PrivateRoute path="/orders" exact component={Orders} />
        <PrivateRoute path="/teams" exact component={Teams} />
      </Switch>
    </Router>
  );
};

export default Routes;
