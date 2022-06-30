import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <section>
            <h1 className="text-red-700 ">
                {user
                    ? `Olá, ${user.username}, o senhor está Logadoooo`
                    : "You are on home page!"}
            </h1>
        </section>
    );
};

export default Home;

// {user && <UserInfo user={user} />}
