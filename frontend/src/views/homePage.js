import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ProtectedPage from "./ProtectedPage";
import LoginPage from "./loginPage";

const Home = () => {
    const { user } = useContext(AuthContext);

    return <section>{user ? <ProtectedPage /> : <LoginPage />}</section>;
};

export default Home;
