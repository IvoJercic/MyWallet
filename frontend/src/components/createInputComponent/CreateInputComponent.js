import './CreateInputComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import React, { useEffect, useState } from 'react';
import ReactSelectComponent from '../reactSelectComponent/ReactSelectComponent';

import * as FaIcons from 'react-icons/fa';
import axios from "axios";

const CreateInputComponent = ({
    categoryList,
    setRefresher }) => {

    const [categoryListForSelect, setCategoryListForSelect] = useState([]);
    const [subCategoryListForSelect, setSubCategoryListForSelect] = useState([]);

    const [subCategoryList, setSubCategoryList] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [input, setInput] = useState("");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        makeObjectForSelectElement(categoryList);
        getAllSubCategoriesForCategory();

    }, [categoryList,selectedCategory]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/subcategory/",
            {
                // name: subCategoryName,
                // category: selectedCategoryForSubcategories.id,
                // icon: selectedIcon
            },
            config
        );
        // setRefresher(prevState => !prevState);
        // setSubCategoryName("");
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const getAllSubCategoriesForCategory = async () => {
        console.log("RADII");
        const { data } = await axios.get(
            "/api/subcategory/" + selectedCategory.id
        );
        console.log(data);

        let tempSubCategoryList = [];
        if (data.subcategoriesList != null) {
            data.subcategoriesList.map((e) => {
                tempSubCategoryList.push(e);
            });
            setSubCategoryList(tempSubCategoryList);
            makeObjectForSelectElement2();
        }
    }

    const makeObjectForSelectElement = () => {
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

    const makeObjectForSelectElement2 = () => {
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
        // setRefresher(prevState => !prevState);
    }

    const handleSubCategorySelect = (category) => {
        setSelectedSubCategory(category);
        // setRefresher(prevState => !prevState);
    }

    return (
        <form action="#" className="signin-up-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">Add new input</h1>
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