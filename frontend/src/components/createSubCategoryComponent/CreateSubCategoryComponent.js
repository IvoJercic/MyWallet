import './CreateSubCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewSubCategory } from "../../redux/actions/categoryActions";
import ReactSelectComponent from '../ReactSelectComponent';
import { getAllCategories } from "../../redux/actions/categoryActions";
import { getAllSubCategoriesForCategory } from "../../redux/actions/subCategoryActions";

import * as FaIcons from 'react-icons/fa';

const CreateSubCategoryComponent = ({setSelectedCategoryForSubcategories}) => {

    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [listForSelect, setListForSelect] = useState([]);

    const dispatch = useDispatch();
    const data = useSelector(state => state.category.categories);

    useEffect(() => {
        if (!data) {
            dispatch(getAllCategories());
        }
        else {
            setCategoryList(data.categoriesList);
            setSelectedCategoryForSubcategories(data.subCategoriesList);
        }

        makeObject(categoryList)
        // console.log(categoryList);
    }, [data]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewSubCategory(selectedCategoryName, subCategoryName, selectedIcon))
    };

    const handleCategorySelect = (category) => {
        setSelectedCategoryForSubcategories(category.name);
        setSelectedCategoryName(category.name);
        setSelectedColor(category.color);
        dispatch(getAllSubCategoriesForCategory(category.name));
        console.log(category.name);
    };

    const handleSubCategoryChange=(e)=>{        
        setSubCategoryName(e.target.value);
    }

    const makeObject = () => {
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
                setCategoryName={setSelectedCategoryName}
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
                className={selectedIcon !== "" && selectedCategoryName !== "" && subCategoryName !== "" && subCategoryName.length > 2 ? "btn solid" : "btnDisabled"}
            >Save</button>
        </form>
    );
};

export default CreateSubCategoryComponent;