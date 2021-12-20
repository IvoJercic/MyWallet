import './CreateInputComponent.css';
import React, { useEffect, useState } from 'react';
import ReactSelectComponent from '../reactSelectComponent/ReactSelectComponent';

import * as FaIcons from 'react-icons/fa';
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateInputComponent = ({
    categoryList,
    accountList,
    setRefresher
    }) => {

    const [categoryListForSelect, setCategoryListForSelect] = useState([]);
    const [subCategoryListForSelect, setSubCategoryListForSelect] = useState([]);
    const [accountListForSelect, setAccountListForSelect] = useState([]);
    const [ref, setRef] = useState(true);//refresher

    const [subCategoryList, setSubCategoryList] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedAccount,setSelectedAccount]=useState("");
    const [input, setInput] = useState("");
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        makeObjectForCategorySelect();
    }, [categoryList]);

    useEffect(() => {
        makeObjectForAccountSelect();
    }, [accountList]);


    useEffect(() => {
        getAllSubCategoriesForCategory();
    }, [selectedCategory]);

    useEffect(() => {
        makeObjectForSubcategorySelect();
    }, [ref]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/input/",
            {
                datetime: startDate,
                category: selectedCategory.id,
                subcategory: selectedSubCategory.id,
                description: input,
                amount: amount,
                account:selectedAccount.id,
                user: JSON.parse(localStorage.getItem("userInfo"))._id
            },
            config
        );
        window.location.reload(true);

        setRefresher(prevState => !prevState);
        setStartDate(new Date());
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedAccount("");
        setInput("");
        setAmount("");
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const getAllSubCategoriesForCategory = async () => {
        const { data } = await axios.get(
            "/api/subcategory/" + selectedCategory.id
        );
        setSubCategoryList(data.subcategoriesList);
        setRef(prev => !prev);
    }

    const makeObjectForCategorySelect = () => {
        let temp = [];
        categoryList.map(element => {
            temp.push({
                value: element.name,
                label:
                    <div
                        style={{ color: element.color }}
                    >
                        {/* {React.createElement(FaIcons[element.icon])} */}
                        <span>{element.name} ({element.type})</span>
                    </div>,
                category: element
            })
        });
        setCategoryListForSelect(temp);
    }

    const makeObjectForAccountSelect = () => {
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

    const makeObjectForSubcategorySelect = () => {
        let temp = [];
        subCategoryList.map(element => {
            temp.push({
                value: element.name,
                label:
                    <div
                        style={{ color: element.color }}
                    >
                        {/* {React.createElement(FaIcons[element.icon])} */}
                        <span>{element.name} ({element.type})</span>
                    </div>,
                category: element
            })
        });
        setSubCategoryListForSelect(temp);
    }

    const handleCategorySelect = (category) => {
        console.log(category);
        setSelectedCategory(category);
    }

    const handleAccountSelect = (category) => {
        console.log(category);
        setSelectedAccount(category);
    }

    const handleSubCategorySelect = (category) => {
        setSelectedSubCategory(category);
    }

    const handleDateTimeSelect = (date) => {
        if (date.length == startDate.length) {
            setStartDate(date);
        }
    }

    return (
        <form action="#" className="createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">New</h1>
            <br />
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDateTimeSelect(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy hh:mm a"
                    showTimeInput
                />
            </div>
            <label htmlFor="subCategoryName" /> Account
            <ReactSelectComponent
                options={accountListForSelect}
                handleCategorySelect={handleAccountSelect}
            />
            <br />

            <label htmlFor="subCategoryName" /> Category name
            <ReactSelectComponent
                options={categoryListForSelect}
                handleCategorySelect={handleCategorySelect}
            />
            <br />
            <label htmlFor="subCategoryName" /> Subcategory name
            <ReactSelectComponent
                options={subCategoryListForSelect}
                handleCategorySelect={handleSubCategorySelect}
            />
            <br />
            <label htmlFor="inputDescription" /> Description of input

            <div className="createcategory__input">
                <i className=""></i>
                <input
                    id="inputDescription"
                    type="text"
                    placeholder="Beer"
                    value={input}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>

            <label htmlFor="inputAmount" /> Amount (kn)
            <div className="createcategory__input">
                <i></i>
                <input
                    id="inputAmount"
                    type="number"
                    placeholder="Amount (kn)"
                    value={amount}
                    min={0}
                    max={selectedCategory.type=="Expense"?selectedAccount.amount:99999}
                    onChange={(e) => handleAmountChange(e)}
                />
            </div>

            <br />
            <br />
            <button
                type="submit"
                className={selectedCategory !== "" && selectedSubCategory !== "" && input.length > 2 && input != "" && amount > 0 ? "btn solid" : "btnDisabled"}
            >Save</button>
        </form>
    );
};

export default CreateInputComponent;