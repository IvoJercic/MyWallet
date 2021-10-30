import './CreateCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import { CirclePicker } from 'react-color';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewMainCategory } from "../../redux/actions/categoryActions";

const CreateCategoryComponent = () => {

    const [categoryName,setCategoryName]=useState("");
    const [selectedColor, setSelectedColor] = useState("#2196f3");
    const [selectedIcon,setSelectedIcon]=useState("");

    const dispatch=useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(categoryName,selectedColor,selectedIcon);
        dispatch(createNewMainCategory(categoryName,selectedColor,selectedIcon))
        // alert("RADI");

    };

    const handleChangeComplete = (color) => {
        setSelectedColor(color.hex);
        // alert(color.hex);
    };
    return (
        <div className="createcategory">
            <h1 className="title center">Create new category...</h1>
            <form action="#" className="sign-in-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="createcategory__input">
                    <i className="fas fa-list"></i>
                    <input
                        type="text"
                        placeholder="Category name"
                        value={categoryName}
                        onChange={(e)=>setCategoryName(e.target.value)}
                    />
                </div>

                <CirclePicker
                    className="colorPicker"
                    color={selectedColor}
                    onChangeComplete={handleChangeComplete}
                />
                <br />
                <br />
                <IconDisplayComponent selectedColor={selectedColor} setSelectedIcon={setSelectedIcon}/>

                <button type="submit" className="btn solid">Save Category</button>

            </form>
        </div>
    );
};

export default CreateCategoryComponent;