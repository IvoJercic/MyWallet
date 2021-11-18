import './CreateInputComponent.css';
import React, { useEffect, useState } from 'react';
import ReactSelectComponent from '../reactSelectComponent/ReactSelectComponent';

import * as FaIcons from 'react-icons/fa';
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateInputComponent = ({
    categoryList,
    setRefresher
}) => {

    const [categoryListForSelect, setCategoryListForSelect] = useState([]);
    const [subCategoryListForSelect, setSubCategoryListForSelect] = useState([]);
    const [ref, setRef] = useState(true);//refresher

    const [subCategoryList, setSubCategoryList] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [input, setInput] = useState("");
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        makeObjectForCategorySelect(categoryList);

    }, [categoryList]);

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
                user: JSON.parse(localStorage.getItem("userInfo"))._id
            },
            config
        );
        setRefresher(prevState=>!prevState);
        setStartDate(new Date());
        setSelectedCategory("");
        setSelectedSubCategory("");
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
                        {React.createElement(FaIcons[element.icon])}
                        <span>{element.name} ({element.type})</span>
                    </div>,
                category: element
            })
        });
        setCategoryListForSelect(temp);
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
                        {React.createElement(FaIcons[element.icon])}
                        <span>{element.name} ({element.type})</span>
                    </div>,
                category: element
            })
        });
        setSubCategoryListForSelect(temp);
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
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
        <form action="#" className="signin-up-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">New input:</h1>
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
                <i className="fas fa-list"></i>
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
                className={selectedCategory !== "" && selectedSubCategory !== "" && input.length > 3 && input != "" && amount > 0 ? "btn solid" : "btnDisabled"}
            >Save</button>
        </form>
    );
};

export default CreateInputComponent;