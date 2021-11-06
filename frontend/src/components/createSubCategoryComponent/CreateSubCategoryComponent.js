import './CreateSubCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import React, { useEffect, useState } from 'react';
import ReactSelectComponent from '../ReactSelectComponent';

import * as FaIcons from 'react-icons/fa';
import axios from "axios";

const CreateSubCategoryComponent = (
    {
        categoryList,
        setSelectedCategory,
        setRefresher }) => {

    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [selectedCategoryId,setSelectedCategoryId]=useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const [listForSelect, setListForSelect] = useState([]);    

    useEffect(() => {
        makeObjectForSelectElement(categoryList);
    }, [categoryList]);


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
                name: subCategoryName,
                category: selectedCategoryId,
                icon: selectedIcon
            },
            config
        );
        setRefresher(prevState => !prevState);
        setSelectedCategoryName("");
        setSelectedCategoryId("");
        setSelectedColor("");
        setSelectedIcon("");
        setSubCategoryName("");
    };

    const handleCategorySelect = (category) => {
        setSelectedCategoryName(category.name);
        setRefresher(prevState => !prevState);
        setSelectedColor(category.color);
        setSelectedCategory(category);
        setSelectedCategoryId(category.id);
    };

    const handleSubCategoryChange = (e) => {
        setSubCategoryName(e.target.value);
    }

    const makeObjectForSelectElement = () => {
        let temp = [];
        categoryList.map(element => {
            temp.push({
                value: element.name,
                label:
                    <div
                        style={{ color: element.color }}
                        onClick={() => handleCategorySelect(element)}
                    >
                        {React.createElement(FaIcons[element.icon])}
                        <span>{element.name}</span>
                    </div>
            })
        });
        setListForSelect(temp);
    }

    return (
        <form action="#" className="sign-up-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">Add new subcategory</h1>
            <br />
            <label htmlFor="subCategoryName" /> Category name
            <ReactSelectComponent
                options={listForSelect}
            />
            <br />

            <label htmlFor="subCategoryName" /> Subcategory name
            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    id="subCategoryName"
                    type="text"
                    placeholder="Subcategory"
                    value={subCategoryName}
                    onChange={(e) => handleSubCategoryChange(e)}
                />
            </div>

            <br />
            <br />
            {selectedColor !== ""
                ? <IconDisplayComponent selectedColor={selectedColor} setSelectedIcon={setSelectedIcon} />
                : ""
            }
            <br />
            <button
                type="submit"
                className={selectedIcon !== "" && subCategoryName !== "" && subCategoryName.length > 2 ? "btn solid" : "btnDisabled"}
            >Save</button>
        </form>
    );
};

export default CreateSubCategoryComponent;