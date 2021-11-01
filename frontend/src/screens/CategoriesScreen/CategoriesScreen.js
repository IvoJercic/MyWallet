import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Components
import CreateCategoryComponent from "../../components/createCategoryComponent/CreateCategoryComponent";
import CreateSubCategoryComponent from "../../components/createSubCategoryComponent/CreateSubCategoryComponent";
//Actions
import { getAllCategories } from "../../redux/actions/categoryActions";
import * as FaIcons from 'react-icons/fa';
import './CategoriesScreen.css';


const CategoriesScreen = ({ history }) => {
    const [mainCategoryMode, setMainCategoryMode] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    const dispatch = useDispatch();
    const data = useSelector(state => state.category.categories);

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
        }
    }, [data]);

    const createIcon = (iconName) => {
        const icon = React.createElement(FaIcons[iconName], { key: iconName, className: "icon" });
        let bckColor;

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
                    <CreateCategoryComponent history={history} />

                    <CreateSubCategoryComponent history={history} />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <div className="categoryList__div">
                            <h1 className="center">Your categories </h1>
                            {/*key={"div__" + iconName}*/}
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
                        <h3>Here you can create subcategories for easier managing</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={() => setMainCategoryMode(!mainCategoryMode)}>
                            Add Categories
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesScreen;