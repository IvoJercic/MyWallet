import { useEffect, useState } from "react";

//Style
import "./HomeScreen.css";

//Assets
import log from "../../assets/log.svg";
import register from "../../assets/register.svg";

//Components
import LoginComponent from "../../components/loginComponent/LoginComponent";
import RegisterComponent from "../../components/registerComponent/RegisterComponent";

const HomeScreen = ({ history }) => {
    const [signInMode, setSignInMode] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if (userInfo) {
            history.push("/dashboard");
        }
    }, [history]);

    return (
        <div className={signInMode === false ? "container sign-up-mode" : "container"}>
            <div className="forms-container">
                <div className="signin-signup">
                    <LoginComponent history={history}/>                                        
                    <RegisterComponent history={history}/>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={()=>setSignInMode(!signInMode)}>
                            Sign up
                        </button>
                    </div>
                    <img src={log} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={()=>setSignInMode(!signInMode)}>
                            Sign in
                        </button>
                    </div>
                    <img src={register} className="image" alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomeScreen