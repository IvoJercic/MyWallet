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
    const [mainCategoryMode, setMainCategoryMode] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if (userInfo) {
            history.push("/dashboard");
        }
    }, [history]);

    const activateTab = (tabId) => {
        if (tabId == "categoryTab") {
            document.getElementById("subcategoryTab").classList.remove("activeTab");
            document.getElementById("categoryTab").classList.add("activeTab");
            setMainCategoryMode(true);
        }
        else if (tabId == "subcategoryTab") {
            document.getElementById("categoryTab").classList.remove("activeTab");
            document.getElementById("subcategoryTab").classList.add("activeTab");
            setMainCategoryMode(false);
        }
    }

    return (
        <div className="mainDiv">
            <div style={{ display: "flex" }}>
                <div className="tablink activeTab" onClick={() => activateTab("categoryTab")} id="categoryTab">Login</div>
                <div className="tablink" onClick={() => activateTab("subcategoryTab")} id="subcategoryTab">Register</div>
            </div>

            <div style={mainCategoryMode ? { display: "block" } : { display: "none" }}>
                <div className="homeTitleDiv">
                    <h1 className="center white">Welcome to MyWallet app.</h1>
                    <h3 className="center white typing">Track your money flow</h3>
                </div>

                <div>
                    <LoginComponent history={history} />
                </div>
            </div>

            <div style={mainCategoryMode ? { display: "none" } : { display: "block" }}>
                <div className="homeTitleDiv" >
                <h1 className="center white">Register here</h1>

                </div>
                <div>
                    <RegisterComponent history={history} />
                </div>
            </div>
        </div>
    )
}

export default HomeScreen