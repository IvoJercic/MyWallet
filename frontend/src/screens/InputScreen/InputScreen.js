import React, { useEffect, useState } from "react";
//CSS
import './InputScreen.css';
//Components
import CreateInputComponent from "../../components/createInputComponent/CreateInputComponent";
import * as FaIcons from 'react-icons/fa';
import axios from "axios";
import UpdateInputComponent from "../../components/updateInputComponent/UpdateInputComponent";


const InputScreen = ({ history }) => {
  const [mainCategoryMode, setMainCategoryMode] = useState(true);

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [refresher, setRefresher] = useState(false);

  const [updateInput, setUpdateInput] = useState(false);
  const [inputForUpdate, setInputForUpdate] = useState("");



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

  useEffect(() => {
    getAllInputs();
  }, [refresher]);

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
  const handleEditInput = async (input) => {    
    setUpdateInput(false);
    setTimeout(() => {
      setUpdateInput(true);  
    }, 100);
    
    setInputForUpdate(input);
  }

  const createEditIcon = (input) => {
    const icon = React.createElement(FaIcons["FaPen"],
      {
        key: "edit" + input.id,
        className: "editicon",
        onClick: () => handleEditInput(input)
      });
    return (
      <div
        key={"edit_icon__" + input.id}
        className="categoryIcon"
      >{icon}
      </div>
    );
  };

  return (
    <div className={"container"}>
      <div className="forms-container">
        <div className="signin-signup">

          {updateInput
            ? <UpdateInputComponent
              setRefresher={setRefresher}
              inputForUpdate={inputForUpdate}
              setUpdateInput={setUpdateInput} 
              categoryList={categoryList}
              subCategoryList={subCategoryList}/>

            : <CreateInputComponent
              categoryList={categoryList}
              setRefresher={setRefresher} />
          }


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
                      style={{ background: categoryList.filter(cat => cat.id === input.category)[0].color }}
                    >
                      <div className="inputTab__date">
                        {new Date(input.datetime).toLocaleString().substring(0, 19)}
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="inputTab__description">
                        <b>
                          {input.description}
                          &nbsp;
                          ({input.amount} kn)
                        </b>
                      </div>
                      <div>
                        {createEditIcon(input)}
                      </div>
                    </div>
                  ).reverse().slice(0, 10)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputScreen;