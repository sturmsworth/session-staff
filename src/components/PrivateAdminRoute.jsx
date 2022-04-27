import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HOME } from "../routes";

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const { currentFiscal, currentSupport } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentFiscal || currentSupport ? (
          <Component {...props} />
        ) : (
          <Redirect to={HOME} />
        );
      }}
    ></Route>
  );
};

export default PrivateAdminRoute;
