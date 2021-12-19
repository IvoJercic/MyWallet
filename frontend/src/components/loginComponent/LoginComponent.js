import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import ErrorMessage from "../ErrorMessage";

const LoginComponent = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if(userInfo){
            history.push("/dashboard");
        }
    }, [history,userInfo]);//Promjenov ovoga poziva se useeffect

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    return (
        <form action="#" className="sign-in-form" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="title white">Login here</h1>

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

            <button type="submit" className="btn solid">Login</button>
            {loading === true ? "Signin in ..." : "..."}
            <div>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            </div>
        </form>
    )
};

export default LoginComponent;