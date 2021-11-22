import './UpdateAccountsComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import { CirclePicker } from 'react-color';
import { useState, useEffect } from 'react';
import axios from "axios";
import * as FaIcons from 'react-icons/fa';

const UpdateAccountsComponent = ({ setRefresher, accountForUpdate, setUpdateAccount }) => {

    const [accountName, setAccountName] = useState("");
    const [accountAmount, setAccountAmount] = useState(0);

    useEffect(() => {
        setAccountName(accountForUpdate.name);
        setAccountAmount(accountForUpdate.amount);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        setRefresher(prevState => !prevState);
        setUpdateAccount(false);
        const { data } = await axios.put(
            "/api/account/" + accountForUpdate.id,
            {
                name: accountName
            },
            config
        );
        setAccountName("");
        setAccountAmount(0);
    };

    const handleCancelUpdate = () => {
        const popup = window.confirm("Are you sure you want to cancel editing your account " + accountForUpdate.name);
        if (popup) {
            setUpdateAccount(false);
        }
    }

    return (
        <form action="#" className="sign-in-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <span style={{ display: 'flex' }}><h1 className="center">Update category</h1> </span>
            <h2>{accountForUpdate.name}</h2>
            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    type="text"
                    placeholder="Name"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                />
            </div>
            <br />
            <span style={{ display: "flex" }}>
                <button
                    type="submit"
                    className={accountAmount >0 && accountName !== "" && accountName.length > 2 ? "btn solid" : "btnDisabled"}
                >Save</button>

                &nbsp;
                <button
                    type="button"
                    onClick={() => handleCancelUpdate()}
                    className={"btn solid"}
                >Cancel</button>
            </span>
        </form>
    );
};

export default UpdateAccountsComponent;