import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";

const Home = () => {
    const { user } = useContext(AuthContext);

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
