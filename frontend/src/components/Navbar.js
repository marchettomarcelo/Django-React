import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <nav>
            <h1>App Name</h1>
            <div className="in-out-links-div">
                {user ? (
                    <>
                        <button className="logout-but" onClick={logoutUser}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
