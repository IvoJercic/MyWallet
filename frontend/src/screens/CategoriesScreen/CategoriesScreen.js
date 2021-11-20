import React, { useEffect, useState } from "react";
//CSS
import './CategoriesScreen.css';
//Components
import CreateCategoryComponent from "../../components/createCategoryComponent/CreateCategoryComponent";
import CreateSubCategoryComponent from "../../components/createSubCategoryComponent/CreateSubCategoryComponent";
//
import * as FaIcons from 'react-icons/fa';
import axios from "axios";
import UpdateCategoryComponent from "../../components/updateCategoryComponent/UpdateCategoryComponent";
import UpdateSubCategoryComponent from "../../components/updateSubCategoryComponent/UpdateSubCategoryComponent";


const CategoriesScreen = ({ history }) => {
    const [mainCategoryMode, setMainCategoryMode] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoriesList, setSubCategoriesList] = useState([]);
    const [refresher, setRefresher] = useState(false);

    const [updateCategory, setUpdateCategory] = useState(false);
    const [categoryForUpdate, setCategoryForUpdate] = useState("");

    const [updateSubCategory, setUpdateSubCategory] = useState(false);
    const [subCategoryForUpdate, setSubCategoryForUpdate] = useState("");


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

    const handleDeleteCategoryOrSubcategory = async (category, type) => {
        if (type == "category") {
            const popup = window.confirm("Are you sure you want to delete your category " + category.name + "\nYou will also delete all subcategories for this category !");
            if (popup) {
                setRefresher(prevState => !prevState);
                const { data } = await axios.delete("/api/category/" + category.id);
            }
        }
        else if (type == "subcategory") {
            const popup = window.confirm("Are you sure you want to delete your subcategory " + category.name);
            if (popup) {
                setRefresher(prevState => !prevState);
                const { data } = await axios.delete("/api/subcategory/" + category.id);
            }
        }
    }

    const handleEditCategoryOrSubcategory = async (category, type) => {
        if (type == "category") {
            setUpdateCategory(false);
            setTimeout(() => {
                setUpdateCategory(true);
            }, 100);
            setCategoryForUpdate(category);
        }
        else if (type == "subcategory") {
            setUpdateSubCategory(false);
            setTimeout(() => {
                setUpdateSubCategory(true);
            }, 100);
            setSubCategoryForUpdate(category);
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

    const createDeleteIcon = (category, type) => {
        const icon = React.createElement(FaIcons["FaTimes"],
            {
                key: "delete" + category.icon,
                className: "deleteicon",
                onClick: () => handleDeleteCategoryOrSubcategory(category, type)
            });
        return (
            <div
                key={"delete_icon__" + category.icon}
                className="categoryIcon"
            >{icon}
            </div>
        );
    };

    const createEditIcon = (category, type) => {
        const icon = React.createElement(FaIcons["FaPen"],
            {
                key: "edit" + category.icon,
                className: "editicon",
                onClick: () => handleEditCategoryOrSubcategory(category, type)
            });
        return (
            <div
                key={"edit_icon__" + category.icon}
                className="categoryIcon"
            >{icon}
            </div>
        );
    };

    const toggleDiv = (e) => {
        let flag = false;
        e.target.classList.forEach(clazz => {
            if (clazz == "opened") {
                flag = true;
            }
        });

        if (flag) {
            e.target.classList.remove("opened");
        }
        else {
            e.target.classList.add("opened");
        }
    }

    return (
        <div className={mainCategoryMode === false ? "container sign-up-mode" : "container"}>
            <div className="forms-container">
                <div className="signin-signup">
                    {updateCategory
                        ? <UpdateCategoryComponent
                            setRefresher={setRefresher}
                            categoryForUpdate={categoryForUpdate}
                            setUpdateCategory={setUpdateCategory} />

                        : <CreateCategoryComponent
                            setRefresher={setRefresher} />
                    }

                    {updateSubCategory
                        ? <UpdateSubCategoryComponent
                            setRefresher={setRefresher}
                            subCategoryForUpdate={subCategoryForUpdate}
                            setUpdateSubCategory={setUpdateSubCategory}
                            selectedCategory={selectedCategory} />

                        : <CreateSubCategoryComponent
                            categoryList={categoryList}
                            setSelectedCategory={setSelectedCategory}
                            setRefresher={setRefresher}
                        />
                    }
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
                                    // onClick={(e) => toggleDiv(e)}
                                    >
                                        {category.type == "Income"
                                            ? createIcon("FaAngleDoubleUp")
                                            : createIcon("FaAngleDoubleDown")}
                                        &nbsp;&nbsp;
                                        &nbsp;&nbsp;
                                        {createIcon(category.icon)}
                                        &nbsp;&nbsp;
                                        <b>
                                            {category.name}

                                        </b>
                                        &nbsp;&nbsp;
                                        &nbsp;&nbsp;
                                        {createEditIcon(category, "category")}
                                        &nbsp;&nbsp;
                                        {createDeleteIcon(category, "category")}
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
                                        <b>
                                            {subcategory.name}
                                        </b>
                                        &nbsp;&nbsp;
                                        {createEditIcon(subcategory, "subcategory")}
                                        &nbsp;&nbsp;
                                        {createDeleteIcon(subcategory, "subcategory")}
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