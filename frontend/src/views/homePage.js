import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ProfileContext from "../context/ProfileContext";
import ProtectedPage from "./ProtectedPage";

const Home = () => {
    const { user } = useContext(AuthContext);
    const { userProfile } = useContext(ProfileContext);

    return <section>{user ? <ProtectedPage /> : <></>}</section>;
};

export default Home;
