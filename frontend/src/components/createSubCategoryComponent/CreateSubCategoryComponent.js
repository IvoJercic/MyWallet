import './CreateSubCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import React, { useEffect, useState } from 'react';
import ReactSelectComponent from '../reactSelectComponent/ReactSelectComponent';

import * as FaIcons from 'react-icons/fa';
import axios from "axios";

const CreateSubCategoryComponent = (
    {
        categoryList,
        setSelectedCategory,//Potrebno Categorie screen komponenti za ispis odabrane komponente 
        setRefresher }) => {

    const [listForSelect, setListForSelect] = useState([]);
    const [subCategoryName, setSubCategoryName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

    //Proslijedujemo child select komponenti
    const [selectedCategoryForSubcategories, setSelectedCategoryForSubcategories] = useState("");
    //potrebno ovoj komponenit za spremanje


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
                category: selectedCategoryForSubcategories.id,
                icon: selectedIcon
            },
            config
        );
        setRefresher(prevState => !prevState);
        setSubCategoryName("");
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
                    // onClick={() => handleCategorySelect(element)}
                    >
                        {React.createElement(FaIcons[element.icon])}
                        <span>{element.name}</span>
                    </div>,
                category: element
            })
        });
        setListForSelect(temp);
    }

    const handleCategorySelect=(category)=>{
        setSelectedCategoryForSubcategories(category);
        setSelectedCategory(category);
        setRefresher(prevState => !prevState);
    }

    return (
        <form action="#" className="sign-up-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">Add new subcategory</h1>
            <br />
            <label htmlFor="subCategoryName" /> Category name
            <ReactSelectComponent
                options={listForSelect}
                handleCategorySelect={handleCategorySelect}
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
            {selectedCategoryForSubcategories.color !== ""
                ? <IconDisplayComponent selectedColor={selectedCategoryForSubcategories.color} setSelectedIcon={setSelectedIcon} />
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