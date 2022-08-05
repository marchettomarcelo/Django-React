import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import ProtectedPage from "./views/ProtectedPage";
import AreaPage from "./views/AreaPage";
import AdminPage from "./views/AdminPage";

function App() {
    return (
        <Router>
            <AuthProvider>
                <ProfileProvider>
                    <main>
                        <Navbar />
                        <Switch>
                            <PrivateRoute
                                component={AreaPage}
                                path="/areas/:area"
                                exact
                            />
                            <PrivateRoute
                                component={AdminPage}
                                path="/admin"
                                exact
                            />

                            {/* <Route component={Login} path="/login" /> */}
                            <Route component={Home} path="*" />
                        </Switch>
                    </main>
                </ProfileProvider>
            </AuthProvider>
            <Footer />
        </Router>
    );
}

export default App;
