import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Components
import CreateCategoryComponent from "../../components/createCategoryComponent/CreateCategoryComponent";
import CreateSubCategoryComponent from "../../components/createSubCategoryComponent/CreateSubCategoryComponent";
//Actions
import { getAllCategories } from "../../redux/actions/categoryActions";
import { getAllSubCategoriesForCategory } from "../../redux/actions/subCategoryActions";
import * as FaIcons from 'react-icons/fa';
import './CategoriesScreen.css';


const CategoriesScreen = ({ history }) => {
    const [mainCategoryMode, setMainCategoryMode] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    const [selectedCategoryForSubcategories, setSelectedCategoryForSubcategories] = useState(null);
    const [subCategoriesList, setSubCategoriesList] = useState(["1"]);

    const dispatch = useDispatch();
    const data = useSelector(state => state.category.categories);
    const data2 = useSelector(state => state.subcategory);


    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            history.push("/");
        }
        else {
            if (!data) {
                dispatch(getAllCategories());
            }
            else {
                setCategoryList(data.categoriesList);
            }
            if(!data2){
                dispatch(getAllSubCategoriesForCategory());
            }
            else{
                setSubCategoriesList(data2.subcategoriesList);
            }

            console.log(data2.subcategoriesList);
        }
    }, [data,data2]);

    const createIcon = (iconName) => {
        const icon = React.createElement(FaIcons[iconName], { key: iconName, className: "icon" });
        return (
            <div
                key={"icon__" + iconName}
                className="categoryIcon"
            >{icon}
            </div>
        );
    };

    return (
        <div className={mainCategoryMode === false ? "container sign-up-mode" : "container"}>
            <div className="forms-container">
                <div className="signin-signup">
                    <CreateCategoryComponent />

                    <CreateSubCategoryComponent setSelectedCategoryForSubcategories={setSelectedCategoryForSubcategories} />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <div className="categoryList__div">
                            <h1 className="center">Your categories </h1>
                            {
                                categoryList.map(category =>
                                    <div className="categoryTab"
                                        key={category.name}
                                        style={{ background: category.color }}
                                    >
                                        {createIcon(category.icon)}
                                        &nbsp;&nbsp;
                                        {category.name}
                                    </div>
                                )}
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
                            <h1 className="center">Your categories </h1>
                           
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