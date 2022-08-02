import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import ProtectedPage from "./views/ProtectedPage";

function App() {
    return (
        <Router>
            <AuthProvider>
                <ProfileProvider>
                    <main>
                        <Navbar />
                        <Switch>
                            <PrivateRoute
                                component={ProtectedPage}
                                path="/protected"
                                exact
                            />
                            <Route component={Login} path="/login" />

                            <Route component={Home} path="/" />
                        </Switch>
                    </main>
                </ProfileProvider>
            </AuthProvider>
            <Footer />
        </Router>
    );
}

export default App;
