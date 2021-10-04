import React from "react";
import { Route, Redirect } from "react-router-dom";
import { EXECUTIVE } from "../utils/roles";
import { getLocalStorageData } from "../utils/setInitialData";
import Layout from "./Layout";

const PrivateRoute = ({ component, path, ...rest }) => {
  const isLoggedIn = getLocalStorageData("loginData");
  return (
    <Route
      {...rest}
      render={() => {
        if (isLoggedIn && isLoggedIn.role) {
          if (
            ["/teams", "/medicines"].includes(path) &&
            isLoggedIn.role === EXECUTIVE
          ) {
            return <Redirect to="/" />;
          }
          return <Layout>{component}</Layout>;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
