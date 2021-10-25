import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import userSlice, { logout, selectUser } from "../features/userSlice";

const Logout = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();
    const user=useSelector(selectUser);

    const handleLogout=(e)=>{
        e.preventDefault();

        dispatch(logout());
    }
    return (
        <div className="logout">
            <h1>Welcome <span className="logout__userName">{user.name}</span></h1>
            <button className="logout__button" onClick={(e)=> handleLogout(e)}>Logout</button>
        </div>
    )
}

export default Logout