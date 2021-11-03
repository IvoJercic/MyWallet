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
    const [subCategoriesList, setSubCategoriesList] = useState(["1"]);
    const [refresher,setRefresher]=useState(false);

    //Proslijedujemo child componenti
    const [selectedCategoryForSubcategories, setSelectedCategoryForSubcategories] = useState(null);
    const [selectedCategoryForSubcategoriesColor,setSelectedCategoryForSubcategoriesColor]=useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            history.push("/");
        }
        else {
            getAllCategories();
            if (selectedCategoryForSubcategories != null) {
                getAllSubCategoriesForCategory();
            }
        }
    }, [refresher]);



    const getAllCategories = async () => {
        const { data } = await axios.get(
            "/api/category"
        );
        let tempCategoryList = [];
        data.categoriesList.map((e) => {
            tempCategoryList.push(e);
        });

        setCategoryList(tempCategoryList);
    }

    const getAllSubCategoriesForCategory = async () => {
        const { data } = await axios.get(
            "/api/category/" + selectedCategoryForSubcategories
        );

        let tempSubCategoryList = [];
        data.subcategoriesList.map((e) => {
            tempSubCategoryList.push(e);
        });

        setSubCategoriesList(tempSubCategoryList);
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

    return (
        <div className={mainCategoryMode === false ? "container sign-up-mode" : "container"}>
            <div className="forms-container">
                <div className="signin-signup">
                    <CreateCategoryComponent setRefresher={setRefresher}/>

                    <CreateSubCategoryComponent
                        categoryList={categoryList}
                        setSelectedCategoryForSubcategories={setSelectedCategoryForSubcategories}
                        setSelectedCategoryForSubcategoriesColor={setSelectedCategoryForSubcategoriesColor}
                        setRefresher={setRefresher}
                    />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <div className="categoryList__div">
                            <h1 className="center">Your categories </h1>
                            {categoryList ?
                                categoryList.map(category =>
                                    <div className="categoryTab"
                                        key={category.name}
                                        style={{ background: category.color }}
                                    >
                                        {createIcon(category.icon)}
                                        &nbsp;&nbsp;
                                        {category.name}
                                    </div>
                                ) : ""}
                        </div>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={() => setMainCategoryMode(!mainCategoryMode)}>
                            Add Subcategories
                        </button>
                    </div>
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <div className="categoryList__div">
                            <h1 className="center">Selected category </h1>
                            {selectedCategoryForSubcategories}
                            <hr />
                            {subCategoriesList!=[] ?
                                subCategoriesList.map(subcategory =>
                                    <div className="categoryTab"
                                        key={"subcategory_" + subcategory.name}
                                        style={{ background: selectedCategoryForSubcategoriesColor }}
                                    >
                                        {subcategory.icon
                                            ? createIcon(subcategory.icon, "sub")
                                            : ""
                                        }
                                        &nbsp;&nbsp;
                                        {subcategory.name}
                                    </div>
                                ) : ""}

                            <button className="btn transparent" id="sign-up-btn" onClick={() => setMainCategoryMode(!mainCategoryMode)}>
                                Add category
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesScreen;