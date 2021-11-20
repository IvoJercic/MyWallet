import './UpdateInputComponent.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as FaIcons from 'react-icons/fa';
import DatePicker from "react-datepicker";

const UpdateInputComponent = ({ setRefresher, inputForUpdate, setUpdateInput, categoryList, subCategoryList }) => {
    const [inputDescription, setInputDescription] = useState("");
    const [inputDate, setInputDate] = useState(null);
    const [inputAmount, setInputAmount] = useState(0);

    useEffect(() => {
        setInputDescription(inputForUpdate.description);
        setInputDate(new Date(inputForUpdate.datetime));
        setInputAmount(inputForUpdate.amount);
    }, [inputForUpdate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        setRefresher(prevState => !prevState);
        setUpdateInput(false);
        const { data } = await axios.put(
            "/api/input/" + inputForUpdate.id,
            {
                description: inputDescription,
                datetime: inputDate,
                amount: inputAmount,
            },
            config
        );
        setInputDescription("");
        setInputDate(null);
        setInputAmount(0);
    };

    const handleCancelUpdate = () => {
        const popup = window.confirm("Are you sure you want to cancel editing your input " + inputForUpdate.description);
        if (popup) {
            setUpdateInput(false);
        }
    }

    const handleDateTimeSelect = (date) => {
        if (date.length == inputDate.length) {
            setInputDate(date);
        }
    }

    const handleAmountChange = (e) => {
        setInputAmount(e.target.value);
    }

    const createIcon = (iconName, prefix = "") => {
        const icon = React.createElement(FaIcons[iconName], { key: prefix + iconName, className: "icon" });
        return (
            <div
                key={prefix + "icon__" + iconName}
                className="categoryIcon"
                style={{ alignContent: "center", alignItems: "center", textAlign: "center", paddingLeft: "1rem" }}
            >{icon}
            </div>
        );
    };

    return (
        <form action="#" className="sign-in-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <span style={{textAlign:"center" }}><h1 className="center">Update input</h1></span>
            <h2>{inputForUpdate.description}</h2>
            <div>
                <DatePicker
                    selected={inputDate}
                    onChange={(date) => handleDateTimeSelect(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy hh:mm a"
                    showTimeInput
                />
            </div>
            <br />
            <label htmlFor="inputCategory" /> Category name
            <div className="createcategory__input">
                {createIcon(categoryList.filter(cat => cat.id === inputForUpdate.category)[0].icon)}
                <input
                    id="inputCategory"
                    type="text"
                    placeholder="Category name"
                    defaultValue={categoryList.filter(cat => cat.id === inputForUpdate.category)[0].name}
                    disabled
                />
            </div>
            <br />
            <label htmlFor="inputSubCategory" /> Subcategory name
            <div className="createcategory__input">
                {createIcon(subCategoryList.filter(sub => sub.id === inputForUpdate.subcategory)[0].icon)}
                <input
                    id="inputSubCategory"
                    type="text"
                    placeholder="Subcategory name"
                    defaultValue={subCategoryList.filter(sub => sub.id === inputForUpdate.subcategory)[0].name}
                    disabled
                />
            </div>
            <br />
            <label htmlFor="inputDescription" /> Description of input
            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    id="inputDescription"
                    type="text"
                    placeholder="Description"
                    value={inputDescription}
                    onChange={(e) => setInputDescription(e.target.value)}
                />
            </div>
            <br />
            <label htmlFor="inputAmount" /> Amount (kn)
            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    id="inputAmount"
                    type="number"
                    placeholder="Amount (kn)"
                    value={inputAmount}
                    min={0}
                    onChange={(e) => handleAmountChange(e)}
                />
            </div>
            <span style={{ display: "flex" }}>
                <button
                    type="submit"
                    className={inputDescription !== "" && inputDate !== "" && inputDescription.length > 2 && inputAmount>0 ? "btn solid" : "btnDisabled"}
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

export default UpdateInputComponent;