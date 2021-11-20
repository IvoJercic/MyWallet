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
  const [mainCategoryMode, setMainCategoryMode] = useState(true);


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
    <div className={mainCategoryMode === false ? "container sign-up-mode" : "container"}>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">

            <div className="historyScreen">
              HISTORY
              <div className="historyScreen_table">
                <div className="historyScreen_table_header">
                  <div>DATE</div>
                  <div>DESCRIPTION</div>
                  <div>AMOUNT</div>
                  <div>CATEGORY</div>
                  <div>SUBCATEGORY</div>
                </div>
                <div className="historyScreen_table_body">
                  {inputList ?
                    inputList.map(input =>
                      <div className="historyScreen_table_row" key={input.id}>
                        <div>
                          {new Date(input.datetime).toLocaleString().substring(0, 19)}
                        </div>
                        <div>{input.description}</div>
                        <div>{input.amount} kn</div>
                        <div>{categoryList.filter(cat => cat.id === input.category)[0].name}</div>
                        <div>{subCategoryList.filter(subC => subC.id === input.subcategory)[0].name}</div>
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
      </div>
    </div>


  );
};

export default HistoryScreen;