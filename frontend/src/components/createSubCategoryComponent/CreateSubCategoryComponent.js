import './CreateSubCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import { CirclePicker } from 'react-color';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewMainCategory } from "../../redux/actions/categoryActions";

const CreateSubCategoryComponent = () => {

    const [categoryName, setCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("#2196f3");
    const [selectedIcon, setSelectedIcon] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewMainCategory(categoryName, selectedColor, selectedIcon))
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    return (
        <form action="#" className="sign-up-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">Add new subcategory</h1>
            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    type="text"
                    placeholder="Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </div>

            <CirclePicker
                className="colorPicker"
                color={selectedColor}
                onChangeComplete={handleColorChange} 
            />
            <br />
            <br />
            <IconDisplayComponent selectedColor={selectedColor} setSelectedIcon={setSelectedIcon} />
            <br />
            <button 
                type="submit" 
                className={selectedIcon!=="" && categoryName!=="" && categoryName.length>2 ?"btn solid":"btnDisabled"}
            >Save</button>
        </form>
    );
};

export default CreateSubCategoryComponent;