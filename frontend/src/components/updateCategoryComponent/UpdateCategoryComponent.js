import './UpdateCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import { CirclePicker } from 'react-color';
import { useState, useEffect } from 'react';
import axios from "axios";
import * as FaIcons from 'react-icons/fa';

const UpdateCategoryComponent = ({ setRefresher, categoryForUpdate, setUpdateCategory }) => {

    const [categoryName, setCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

    useEffect(() => {
        setCategoryName(categoryForUpdate.name);
        setSelectedColor(categoryForUpdate.color);
        setSelectedIcon(categoryForUpdate.icon);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        setRefresher(prevState => !prevState);
        setUpdateCategory(false);
        const { data } = await axios.put(
            "/api/category/" + categoryForUpdate.id,
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

    const handleCancelUpdate = () => {
        const popup = window.confirm("Are you sure you want to cancel editing your category " + categoryForUpdate.name);
        if (popup) {
            setUpdateCategory(false);
        }
    }

    return (
        <form action="#" className="sign-in-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <span style={{ display: 'flex' }}><h1 className="center">Update category</h1> </span>
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
            <span style={{ display: "flex" }}>
                <button
                    type="submit"
                    className={selectedIcon !== "" && categoryName !== "" && categoryName.length > 2 ? "btn solid" : "btnDisabled"}
                >Save</button>

                &nbsp;
                <button
                    type="button"
                    onClick={() => handleCancelUpdate()}
                    className={"btn solid"}
                >Cancel</button>
            </span>
        </form>
    );
};

export default UpdateCategoryComponent;