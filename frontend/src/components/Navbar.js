import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import logo_gas_branco from "../../public/logo_gas_branco.png";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <nav>
            <div className="inner-nav">
                <div className="logo-div">
                    <img
                        className="logo-gas"
                        src={"/logo_gas_branco.png"}
                        alt="logo"
                    />
                </div>
                <h1 className="gastools">GAS Tools</h1>
                {user && (
                    <div className="in-out-links-div">
                        {" "}
                        <button className="logout-but" onClick={logoutUser}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
