import { useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import { MY_ACCOUNT } from "../routes";

const Homepage = () => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Redirect to={MY_ACCOUNT} /> : <div>Homepage</div>;
};

export default Homepage;
