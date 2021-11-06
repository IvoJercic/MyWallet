import './CreateCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import { CirclePicker } from 'react-color';
import { useState } from 'react';
import axios from "axios";

const CreateCategoryComponent = ({setRefresher}) => {

    const [categoryName, setCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("#2196f3");
    const [selectedIcon, setSelectedIcon] = useState("");


    const handleSubmit = async(e) => {
        e.preventDefault();
        // dispatch(createNewMainCategory(categoryName, selectedColor, selectedIcon))
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/category",
            {
                name:categoryName,
                color:selectedColor,
                icon:selectedIcon,
                user:JSON.parse(localStorage.getItem("userInfo"))._id
            },
            config
        );
        setRefresher(prevState => !prevState);
        setCategoryName("");
        setSelectedColor("#2196f3");
        setSelectedIcon("");
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    return (
        <form action="#" className="sign-in-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">Add new category</h1>
        <br/>
            <label htmlFor="subCategoryName"/> Category name
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

export default CreateCategoryComponent;