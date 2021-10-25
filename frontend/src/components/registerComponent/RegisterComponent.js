import { useEffect, useState } from "react";
import axios from "axios";

//Components
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

const RegisterComponent = ({history}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    // const [picture, setPicture] = useState(
    //     "https://media-exp1.licdn.com/dms/image/C4D03AQFlgeKhqY5ktQ/profile-displayphoto-shrink_100_100/0/1634932650392?e=1640217600&v=beta&t=MkCC-Yyxxwl51qpB7hEdGwUXN2l5YGrA-HcyL8gOHkQ"
    // );
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    // const [pictureMessage, setPictureMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
        }
        else {
            setMessage(null);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                setLoading(true);
                const { data } = await axios.post(
                    "/api/users",
                    {
                        name,
                        email,
                        password
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
    }

    // const postDetails = (pics) => {
    //     if (!pics) {
    //         return setPictureMessage("Please select an image !");
    //     }
    //     setPictureMessage(null);

    //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
    //         const data = new FormData();
    //         data.append('file', pics);
    //         data.append("upload_preset", "MyWallet");
    //         data.append("cloud_name", "dchfiudfq");//cloud name at Cloudinary
    //         fetch("https://api.cloudinary.com/v1_1/dchfiudfq/image/upload", {
    //             method: "post",
    //             body: data
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 console.log(data);
    //                 setPicture(data.url)
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //     }
    //     else {
    //         return setPictureMessage("Please select an image");
    //     }

    // }

    return (
        <form action="#" className="sign-up-form" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="title">Register here</h1>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                    type="name"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>


            <div className="input-field">
                <i className="fas fa-envelope"></i>
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

            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                    id="registerScreen__confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            {/* <input
                id="registerScreen__picture"
                type="file"
                placeholder="Upload picture"
                onChange={(e) => postDetails(e.target.files[0])}
            /> */}
            <button type="submit" className="btn solid" style={{ display: loading === false ? "block" : "none" }}>Register</button>
            {loading === true ? "Registering in ..." : "..."}

            <div>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            </div>
        </form>
    );
};

export default RegisterComponent;