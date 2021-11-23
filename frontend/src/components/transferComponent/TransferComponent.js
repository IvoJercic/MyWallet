import './TransferComponent.css';
import React, { useEffect, useState } from 'react';
import ReactSelectComponent from '../reactSelectComponent/ReactSelectComponent';
import axios from "axios";

const TransferComponent = ({setRefresher,accountList}) => {
    const [accountListForSelect, setAccountListForSelect] = useState([]);

    const [accountSender,setAccountSender]=useState("");
    const [accountReceiver,setAccountReceiver]=useState("");
    const [amount,setAmount]=useState(0);

    useEffect(() => {
        makeObjectForSelectElement();
    }, [accountList]);

    const makeObjectForSelectElement = () => {
        let temp = [];
        accountList.map(element => {
            temp.push({
                value: element.name,
                label:
                    <div>
                        <span>{element.name}</span>
                    </div>,
                category: element
            })
        });
        setAccountListForSelect(temp);
    }

    const handleAccountSender=(account)=>{
        setAccountSender(account);
        setRefresher(prevState => !prevState);
    }

    const handleAccountReceiver=(account)=>{
        setAccountReceiver(account);
        setRefresher(prevState => !prevState);
    }

    const handleAmountChange=(e)=>{
        setAmount(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const config = {
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        // };

        // const { data } = await axios.post(
        //     "/api/input/",
        //     {
        //         datetime: startDate,
        //         category: selectedCategory.id,
        //         subcategory: selectedSubCategory.id,
        //         description: input,
        //         amount: amount,
        //         account:selectedAccount.id,
        //         user: JSON.parse(localStorage.getItem("userInfo"))._id
        //     },
        //     config
        // );
        setRefresher(prevState => !prevState);
        setAccountSender("");
        setAccountReceiver("");
        setAmount(0);
    };

    return (
        <form action="#" className="sign-up-form createcategory">
            <h1 className="center">Transfer amount to other account</h1>
            <p>From</p>
            <ReactSelectComponent
                options={accountListForSelect}
                handleCategorySelect={handleAccountSender}
            />
            <hr/>
            <p>To</p>
            <ReactSelectComponent
                options={accountListForSelect}
                handleCategorySelect={handleAccountReceiver}
            />            
            <hr/>
            <label htmlFor="subCategoryName" /> Amount
            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    id="subCategoryName"
                    type="number"
                    placeholder="100"
                    value={amount}
                    onChange={(e) => handleAmountChange(e)}
                />
            </div>
            <button
                type="submit"
                className={accountSender !== "" && accountReceiver !== "" &&  amount > 0 ? "btn solid" : "btnDisabled"}
            >Save</button>
        </form>
    );
};

export default TransferComponent;