import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import logo_gas_branco from "../../public/logo_gas_branco.png";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    let botaoLoginLogout = <></>;

    if (user) {
        botaoLoginLogout = (
            <button className="logout-but" onClick={logoutUser}>
                Logout
            </button>
        );
    }

    if (!user && window.location.pathname !== "/login") {
        botaoLoginLogout = (
            <Link to="/login">
                <button className="logout-but">Login</button>
            </Link>
        );
    }

    return (
        <nav>
            <div className="inner-nav">
                <h1 className="gastools">GAS Tools</h1>
                <div className="in-out-links-div">{botaoLoginLogout}</div>
                <div className="logo-div">
                    <img
                        className="logo-gas"
                        src={"/logo_gas_branco.png"}
                        alt="logo"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
