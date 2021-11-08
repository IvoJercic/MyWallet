import './UpdateCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import { CirclePicker } from 'react-color';
import { useState, useEffect } from 'react';
import axios from "axios";

const UpdateCategoryComponent = ({ setRefresher, categoryForUpdate }) => {

    const [categoryName, setCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

    useEffect(() => {
        setCategoryName(categoryForUpdate.name);
        setSelectedColor(categoryForUpdate.color);
        setSelectedIcon(categoryForUpdate.icon);
    }, []);

    const handleSubmit = async (e) => {
        console.log("OKINILO SE");
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        setRefresher(prevState => !prevState);

        const { data } = await axios.put(
            "/api/category/"+categoryForUpdate.id,
            {
                name: categoryName,
                color: selectedColor,
                icon: selectedIcon,
            },
            config
        );
        setCategoryName("");
        setSelectedColor("");
        setSelectedIcon("");
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    return (
        <form action="#" className="sign-in-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">Update category</h1>
            <hr />
            <h2>{categoryForUpdate.name}</h2>
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
            <IconDisplayComponent selectedColor={selectedColor}
                setSelectedIcon={setSelectedIcon}
                updateMode={true}
                iconBeforeUpdate={categoryForUpdate.icon}
            />
            <br />
            <button
                type="submit"
                className={selectedIcon !== "" && categoryName !== "" && categoryName.length > 2 ? "btn solid" : "btnDisabled"}
            >Save</button>
        </form>
    );
};

export default UpdateCategoryComponent;