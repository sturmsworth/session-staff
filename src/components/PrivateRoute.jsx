import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HOME, VERIFY_EMAIL } from "../routes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          !currentUser.emailVerified ? (
            <Redirect to={VERIFY_EMAIL} />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to={HOME} />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
