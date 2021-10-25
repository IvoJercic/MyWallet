import axios from "axios";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";

const LoginComponent = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            setLoading(true);
            const { data } = await axios.post(
                "/api/users/login",
                {
                    email,
                    password,
                },
                config
            );

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/dashboard");
        }
        catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    }
    return (
        <form action="#" className="sign-in-form" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="title">Login here</h1>

            <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="btn solid" style={{ display: loading === false ? "block" : "none" }}>Login</button>
            {loading === true ? "Signin in ..." : "..."}
            <div>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            </div>
        </form>
    )
};

export default LoginComponent;