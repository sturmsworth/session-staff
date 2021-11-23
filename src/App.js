// context providers
import AuthContextProvider from "./context/AuthContext";
import AppManagementContextProvider from "./context/AppManagementContext";
import MetaDataContextProvider from "./context/MetaDataContext";
import AttachmentsDataContextProvider from "./context/AttachmentsContext";
import FormContextProvider from "./context/FormContext";
import TableDataContextProvider from "./context/TableDataContext";

// packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// routes
import * as ROUTES from "./routes";

// pages
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SignInPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import EmergencyContactPage from "./pages/EmergencyContactPage";
import PersonalInformationPage from "./pages/PersonalInformationPage";
import AttachmentsPage from "./pages/AttachmentsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

// components
import SenateNav from "./components/SenateNav";
import SenateFooter from "./components/SenateFooter";
import PrivateRoute from "./components/PrivateRoute";

// scss
import "./styles/App.scss";
import MyAccountPage from "./pages/MyAccountPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <AppManagementContextProvider>
            <MetaDataContextProvider>
              <AttachmentsDataContextProvider>
                <FormContextProvider>
                  <TableDataContextProvider>
                    <SenateNav />
                    <Switch>
                      <Route exact path={ROUTES.HOME} component={Homepage} />
                      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                      <Route
                        path={ROUTES.CREATE_ACCOUNT}
                        component={CreateAccountPage}
                      />
                      <Route
                        path={ROUTES.REGISTRATION_SUCCESS}
                        component={RegistrationSuccessPage}
                      />
                      <PrivateRoute
                        path={ROUTES.MY_ACCOUNT}
                        component={MyAccountPage}
                      />
                      <PrivateRoute
                        path={ROUTES.PERSONAL_INFO_PAGE}
                        component={PersonalInformationPage}
                      />
                      <PrivateRoute
                        path={ROUTES.EMERGENCY_CONTACT_PAGE}
                        component={EmergencyContactPage}
                      />
                      <PrivateRoute
                        path={ROUTES.ATTACHMENTS_PAGE}
                        component={AttachmentsPage}
                      />
                      <Route
                        path={ROUTES.ADMIN_DASHBOARD}
                        component={AdminDashboardPage}
                      />
                    </Switch>
                    <SenateFooter />
                  </TableDataContextProvider>
                </FormContextProvider>
              </AttachmentsDataContextProvider>
            </MetaDataContextProvider>
          </AppManagementContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
