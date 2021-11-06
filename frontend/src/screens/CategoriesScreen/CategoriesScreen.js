import React, { useEffect, useState } from "react";
//CSS
import './CategoriesScreen.css';
//Components
import CreateCategoryComponent from "../../components/createCategoryComponent/CreateCategoryComponent";
import CreateSubCategoryComponent from "../../components/createSubCategoryComponent/CreateSubCategoryComponent";
//
import * as FaIcons from 'react-icons/fa';
import axios from "axios";


const CategoriesScreen = ({ history }) => {

    const [mainCategoryMode, setMainCategoryMode] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoriesList, setSubCategoriesList] = useState([]);
    const [refresher, setRefresher] = useState(false);

    //Proslijedujemo child componenti
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            history.push("/");
        }
        else {
            getAllCategories();
            if (selectedCategory != null) {
                getAllSubCategoriesForCategory();
            }
        }
    }, [refresher]);

    const getAllCategories = async () => {
        const { data } = await axios.get(
            "/api/category/" + JSON.parse(localStorage.getItem("userInfo"))._id
        );
        let tempCategoryList = [];
        data.categoriesList.map((e) => {
            tempCategoryList.push(e);
        });

        setCategoryList(tempCategoryList);
    }

    const getAllSubCategoriesForCategory = async () => {
        const { data } = await axios.get(
            "/api/subcategory/" + selectedCategory.id
        );

        let tempSubCategoryList = [];
        if (data.subcategoriesList != null) {
            data.subcategoriesList.map((e) => {
                tempSubCategoryList.push(e);
            });
            setSubCategoriesList(tempSubCategoryList);
        }
    }

    const handleDeleteCategory = async (category) => {
        let popup = window.confirm("Are you sure you want to delete category " + category.name)        
        if (popup) {
            setRefresher(prevState => !prevState);
            const { data } = await axios.delete("/api/category/" + category.id);
        }        
    }


    const createIcon = (iconName, prefix = "") => {
        const icon = React.createElement(FaIcons[iconName], { key: prefix + iconName, className: "icon" });
        return (
            <div
                key={prefix + "icon__" + iconName}
                className="categoryIcon"
            >{icon}
            </div>
        );
    };

    const createDeleteIcon = (category) => {
        const icon = React.createElement(FaIcons["FaWindowClose"],
            {
                key: "delete" + category.icon,
                className: "deleteicon",
                onClick: () => handleDeleteCategory(category)
            });
        return (
            <div
                key={"delete_icon__" + category.icon}
                className="categoryIcon"
            >{icon}
            </div>
        );
    };


    return (
        <div className={mainCategoryMode === false ? "container sign-up-mode" : "container"}>
            <div className="forms-container">
                <div className="signin-signup">
                    <CreateCategoryComponent setRefresher={setRefresher} />

                    <CreateSubCategoryComponent
                        categoryList={categoryList}
                        setSelectedCategory={setSelectedCategory}
                        setRefresher={setRefresher}
                    />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <div className="categoryList__div">
                            <h1 className="center">Your categories </h1>
                            <hr />
                            {categoryList ?
                                categoryList.map(category =>
                                    <div className="categoryTab"
                                        key={category.name}
                                        style={{ background: category.color }}
                                    >
                                        {createIcon(category.icon)}
                                        &nbsp;&nbsp;
                                        <b>
                                            {category.name}
                                        </b>
                                        &nbsp;&nbsp;
                                        {createDeleteIcon(category)}

                                    </div>
                                ) : ""}
                        </div>
                        <button className="btn transparent" id="sign-up-btn" onClick={() => setMainCategoryMode(!mainCategoryMode)}>
                            Add Subcategories
                        </button>
                    </div>
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <div className="categoryList__div">
                            {selectedCategory
                                ? <h1 className="center">Category: {selectedCategory.name} </h1>
                                : <h1 className="center">Choose category </h1>
                            }
                            <hr />
                            {subCategoriesList ?
                                subCategoriesList.map(subcategory =>
                                    <div className="categoryTab"
                                        key={subcategory.name}
                                        style={{ background: selectedCategory.color }}
                                    >
                                        {createIcon(subcategory.icon, "sub")}
                                        &nbsp;&nbsp;
                                        {subcategory.name}
                                        &nbsp;&nbsp;
                                        {createDeleteIcon(subcategory.icon)}

                                    </div>
                                ) : ""}

                        </div>
                        <button className="btn transparent" id="sign-up-btn" onClick={() => setMainCategoryMode(!mainCategoryMode)}>
                            Add category
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesScreen;