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
                setUpdateCategory(false);
                setRefresher(prevState => !prevState);
                const { data } = await axios.delete("/api/category/" + category.id);
            }
        }
        else if (type == "subcategory") {
            const popup = window.confirm("Are you sure you want to delete your subcategory " + category.name);
            if (popup) {
                setUpdateSubCategory(false);
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

    const activateTab = (tabId) => {
        if (tabId == "categoryTab") {
            document.getElementById("subcategoryTab").classList.remove("activeTab");
            document.getElementById("categoryTab").classList.add("activeTab");
            setMainCategoryMode(true);
        }
        else if (tabId == "subcategoryTab") {
            document.getElementById("categoryTab").classList.remove("activeTab");
            document.getElementById("subcategoryTab").classList.add("activeTab");
            setMainCategoryMode(false);
        }
    }

    return (
        <div className="mainDiv">
            <div style={{ display: "flex" }}>
                <div className="tablink activeTab" onClick={() => activateTab("categoryTab")} id="categoryTab">Categories</div>
                <div className="tablink" onClick={() => activateTab("subcategoryTab")} id="subcategoryTab">Subcategories</div>
            </div>


            <div style={mainCategoryMode ? { display: "block" } : { display: "none" }}>
                <div className="categoryList__div">
                    <h1 className="center white">Your categories </h1>
                    {categoryList ?
                        categoryList.map(category =>
                            <div className="categoryTab"
                                key={category.name}
                                style={{ background: category.color }}
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

                <div>
                    {updateCategory
                        ? <UpdateCategoryComponent
                            setRefresher={setRefresher}
                            categoryForUpdate={categoryForUpdate}
                            setUpdateCategory={setUpdateCategory} />

                        : <CreateCategoryComponent
                            setRefresher={setRefresher} />
                    }

                </div>
            </div>

            <div style={mainCategoryMode ? { display: "none" } : { display: "block" }}>
                <div className="categoryList__div" >
                    {selectedCategory
                        ? <h1 className="center white">Category: {selectedCategory.name} </h1>
                        : <h1 className="center white">Choose category </h1>
                    }
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
                <div>
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
        </div>
    );
};

export default CategoriesScreen;