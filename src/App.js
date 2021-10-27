// context providers
import AuthContextProvider from "./context/AuthContext";
import AppManagementContextProvider from "./context/AppManagementContext";

// packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// routes
import * as ROUTES from "./routes";

// pages
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SignInPage";
import CreateAccountPage from "./pages/CreateAccountPage";

// components
import SenateNav from "./components/SenateNav";
import SenateFooter from "./components/SenateFooter";

// scss
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <AppManagementContextProvider>
          <AuthContextProvider>
            <SenateNav />
            <Switch>
              <Route exact path={ROUTES.HOME} component={Homepage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route
                path={ROUTES.CREATE_ACCOUNT}
                component={CreateAccountPage}
              />
              {/* <Route
                path={ROUTES.SUCCESS}
                component={}
              /> */}
            </Switch>
            <SenateFooter />
          </AuthContextProvider>
        </AppManagementContextProvider>
      </Router>
    </div>
  );
}

export default App;
