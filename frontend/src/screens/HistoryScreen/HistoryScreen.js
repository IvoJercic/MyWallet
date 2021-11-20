import React, { useEffect, useState } from "react";
//CSS
import './HistoryScreen.css';
//Components
import * as FaIcons from 'react-icons/fa';
import axios from "axios";


const HistoryScreen = ({ history }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [inputList, setInputList] = useState([]);


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      history.push("/");
    }
    else {
      getAllCategories();
      getAllSubCategories();
      getAllInputs();
    }
  }, []);


  const getAllCategories = async () => {
    const { data } = await axios.get(
      "/api/category/" + JSON.parse(localStorage.getItem("userInfo"))._id
    );
    setCategoryList(data.categoriesList);
  }

  const getAllSubCategories = async () => {
    const { data } = await axios.get(
      "/api/subcategory/all/" + JSON.parse(localStorage.getItem("userInfo"))._id
    );
    setSubCategoryList(data.subcategoriesList);
  }

  const getAllInputs = async () => {
    const { data } = await axios.get(
      "/api/input/" + JSON.parse(localStorage.getItem("userInfo"))._id
    );
    setInputList(data.inputsList);
  }

  return (
    <div className="historyScreen">
      <h1 className="center">All inputs ever</h1>
      <br />
      <hr />
      <div className="historyScreen_table">
        <div className="historyScreen_table_header">
          <h4>DATE</h4>
          <h4>DESCRIPTION</h4>
          <h4>AMOUNT</h4>
          <h4>CATEGORY</h4>
          <h4>SUBCATEGORY</h4>
        </div>
        <hr />
        <div className="historyScreen_table_body">
          {inputList ?
            inputList.map(input =>
              <div className="historyScreen_table_row" key={input.id}>
                <div>
                  {new Date(input.datetime).toLocaleString().substring(0, 19)}
                </div>
                <div>{input.description}</div>
                <div>{input.amount} kn</div>
                <div>
                  {React.createElement(FaIcons[categoryList.filter(cat => cat.id === input.category)[0].icon])}
                  &nbsp;
                  {categoryList.filter(cat => cat.id === input.category)[0].name}
                </div>
                <div>
                  {React.createElement(FaIcons[subCategoryList.filter(cat => cat.id === input.subcategory)[0].icon])}
                  &nbsp;
                  {subCategoryList.filter(subC => subC.id === input.subcategory)[0].name}
                </div>
              </div>
            ) : ""}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;