import React, { useEffect, useState } from "react";
//CSS
import './InputScreen.css';
//Components
import CreateCategoryComponent from "../../components/createCategoryComponent/CreateCategoryComponent";
import CreateSubCategoryComponent from "../../components/createSubCategoryComponent/CreateSubCategoryComponent";
import CreateInputComponent from "../../components/createInputComponent/CreateInputComponent";


import * as FaIcons from 'react-icons/fa';
import axios from "axios";
import UpdateCategoryComponent from "../../components/updateCategoryComponent/UpdateCategoryComponent";
import UpdateSubCategoryComponent from "../../components/updateSubCategoryComponent/UpdateSubCategoryComponent";


const InputScreen = ({ history }) => {
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

  return (
    <div className={mainCategoryMode === false ? "container sign-up-mode" : "container"}>
      <div className="forms-container">
        <div className="signin-signup">
          <CreateInputComponent
            setRefresher={setRefresher}
            categoryList={categoryList} />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <div className="categoryList__div">
              <h1 className="center">Your last inputs</h1>
              <hr />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputScreen;