import './CreateAccountComponent.css';
import React, { useState } from 'react';
import axios from "axios";

const CreateAccountComponent = ({setRefresher}) => {
    const [name,setName]=useState("");
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/account/",
            {
                name: name,
                amount: amount,
                user: JSON.parse(localStorage.getItem("userInfo"))._id
            },
            config
        );
        
        setRefresher(prevState => !prevState);
        setName("");
        setAmount(0);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    return (
        <form action="#" className="sign-in-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">New account:</h1>
        
            <br />
            <label htmlFor="inputDescription" /> Name

            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    id="inputDescription"
                    type="text"
                    placeholder="Cash"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                />
            </div>

            <label htmlFor="inputAmount" /> Amount (kn)
            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    id="inputAmount"
                    type="number"
                    placeholder="Amount (kn)"
                    value={amount}
                    min={0}
                    onChange={(e) => handleAmountChange(e)}
                />
            </div>

            <br />
            <br />
            <button
                type="submit"
                className={name !== "" && name.length > 2 && amount > 0 ? "btn solid" : "btnDisabled"}
            >Save</button>
        </form>
    );
};

export default CreateAccountComponent;