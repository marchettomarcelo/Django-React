import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ProfileContext from "../context/ProfileContext";

const Home = () => {
    const { user } = useContext(AuthContext);
    const { userProfile } = useContext(ProfileContext);
    console.log(userProfile);
    return (
        <section>
            <h1 className="text-red-700 ">
                {user ? (
                    <div>
                        <Link to="/protected">Ver suas informações</Link> <br />
                        {`Olá, ${user.username}, o senhor está Logadoooo`}
                    </div>
                ) : (
                    "You are on home page!"
                )}
            </h1>
        </section>
    );
};

export default Home;
