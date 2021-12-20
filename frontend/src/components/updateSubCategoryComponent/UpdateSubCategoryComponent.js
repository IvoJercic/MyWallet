import './UpdateSubCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import { CirclePicker } from 'react-color';
import { useState, useEffect } from 'react';
import axios from "axios";
import * as FaIcons from 'react-icons/fa';

const UpdateSubCategoryComponent = ({ setRefresher, subCategoryForUpdate, setUpdateSubCategory, selectedCategory }) => {

    const [subCategoryName, setSubCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

    useEffect(() => {
        setSubCategoryName(subCategoryForUpdate.name);
        setSelectedColor(selectedCategory.color);
        setSelectedIcon(subCategoryForUpdate.icon);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        setRefresher(prevState => !prevState);
        setUpdateSubCategory(false);
        const { data } = await axios.put(
            "/api/subcategory/" + subCategoryForUpdate.id,
            {
                name: subCategoryName,
                icon: selectedIcon,
            },
            config
        );
        setSubCategoryName("");
        setSelectedColor("");
        setSelectedIcon("");
    };


    const handleCancelUpdate = () => {
        const popup = window.confirm("Are you sure you want to cancel editing your subcategory " + subCategoryForUpdate.name);
        if (popup) {
            setUpdateSubCategory(false);
        }
    }

    return (
        <form action="#" className="sign-up-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <span style={{ display: 'flex' }}><h1 className="center">Update subcategory</h1> </span>
            <h2>{subCategoryForUpdate.name}</h2>
            <div className="createcategory__input">
                <i className=""></i>
                <input
                    type="text"
                    placeholder="Subcategory name"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                />
            </div>

            <br />
            <br />
            <IconDisplayComponent selectedColor={selectedColor}
                setSelectedIcon={setSelectedIcon}
                updateMode={true}
                iconBeforeUpdate={subCategoryForUpdate.icon}
            />
            <br />
            <span style={{ display: "flex",flexDirection:"column" }}>
                <button
                    type="submit"
                    className={selectedIcon !== "" && subCategoryName !== "" && subCategoryName.length > 2 ? "btn solid" : "btnDisabled"}
                >Save
                </button>
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

export default UpdateSubCategoryComponent;