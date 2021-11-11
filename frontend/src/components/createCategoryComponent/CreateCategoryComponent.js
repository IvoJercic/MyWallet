import './CreateCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import { CirclePicker } from 'react-color';
import { useState } from 'react';
import axios from "axios";

const CreateCategoryComponent = ({ setRefresher }) => {

    const [categoryName, setCategoryName] = useState("");
    const [categoryType, setCategoryType] = useState("")
    const [selectedColor, setSelectedColor] = useState("#2196f3");
    const [selectedIcon, setSelectedIcon] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/category",
            {
                name: categoryName,
                color: selectedColor,
                icon: selectedIcon,
                user: JSON.parse(localStorage.getItem("userInfo"))._id,
                type:categoryType
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

    const handleSelectCategoryType=(e)=>{        
        setCategoryType(e.target.value);
    }

    return (
        <form action="#" className="sign-in-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">Add new category</h1>
            <br />
            <label htmlFor="subCategoryName" /> Category name
            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    type="text"
                    placeholder="Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </div>
            <div onChange={(e)=>handleSelectCategoryType(e)} className="divRadioBtns">
                <input className="radioBtn" type="radio" value="Income" name="categoryType" id="incomeRadio"/><label htmlFor="incomeRadio">Income</label>
                <input className="radioBtn" type="radio" value="Expense" name="categoryType" id="expenseRadio"/><label htmlFor="expenseRadio">Expense</label>
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
                className={selectedIcon !== "" && categoryName !== "" && categoryName.length > 2 && categoryType !== "" ? "btn solid" : "btnDisabled"}
            >Save</button>
        </form>
    );
};

export default CreateCategoryComponent;