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
                        <span>{element.name} ({element.amount} kn)</span>
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
        if(accountSender===accountReceiver){
            alert("You are trying to fool me");
        }
        else{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
    
            const { data } = await axios.post(
                "/api/account/"+accountSender.id+"/"+accountReceiver.id,
                {
                    amount: amount,
                    user: JSON.parse(localStorage.getItem("userInfo"))._id
                },
                config
            );
            window.location.reload(true);
            setRefresher(prevState => !prevState);
            setAccountSender("");
            setAccountReceiver("");
            setAmount(0);
        }        
    };

    return (
        <form action="#" className="sign-up-form createcategory" onSubmit={(e) => handleSubmit(e)}>
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
                <i></i>
                <input
                    id="subCategoryName"
                    type="number"
                    placeholder="100"
                    value={amount}
                    max={accountSender.amount}
                    min={0}
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