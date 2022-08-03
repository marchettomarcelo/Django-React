import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        email.length > 0 && loginUser(email, password);
    };

    return (
        <section className="form-section">
            <form onSubmit={handleSubmit}>
                <h1>Login </h1>

                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="Enter email" />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                />
                <div className="but-div">
                    <button type="submit">Login</button>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;
