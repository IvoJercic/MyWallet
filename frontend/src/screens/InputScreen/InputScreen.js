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
  const [categoryList, setCategoryList] = useState([]);
  const [inputList, setInputList] = useState([]);

  const [refresher, setRefresher] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      history.push("/");
    }
    else {
      getAllCategories();
      getAllInputs();
      console.log(new Date(1637082736595).toString());
    }
  }, [refresher]);

  const getAllCategories = async () => {
    const { data } = await axios.get(
      "/api/category/" + JSON.parse(localStorage.getItem("userInfo"))._id
    );
    setCategoryList(data.categoriesList);
  }


  const getAllInputs = async () => {
    const { data } = await axios.get(
      "/api/input/" + JSON.parse(localStorage.getItem("userInfo"))._id
    );
    setInputList(data.inputsList);
  }


  return (
    <div className={"container"}>
      <div className="forms-container">
        <div className="signin-signup">
          <CreateInputComponent
            categoryList={categoryList} />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <div className="inputList__div">
              <h1 className="center">Your last inputs</h1>
              <hr />
              <div className="input-container">
                {
                  inputList.map(input =>
                    <div className="inputTab"
                      key={input.id}
                    >
                      <div className="inputTab__date">
                        {new Date(input.datetime).toLocaleString().substring(0, 19)}
                      </div>
                      <div className="inputTab__description">
                        <b>
                          {input.description}
                        </b>
                      </div>
                    </div>
                  ).slice(0, 5)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputScreen;