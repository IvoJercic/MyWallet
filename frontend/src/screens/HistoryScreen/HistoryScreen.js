import React, { useEffect, useState } from "react";
//CSS
import './HistoryScreen.css';
//Components
import CreateInputComponent from "../../components/createInputComponent/CreateInputComponent";
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
      HISTORY
      <table>
        <thead>
          <th>DATE</th>
          <th>DESCRIPTION</th>
          <th>AMOUNT</th>
          <th>CATEGORY</th>
          <th>SUBCATEGORY</th>
        </thead>
        <tbody>
          {inputList ?
            inputList.map(input =>
              <tr key={input.id}>
                <td>{new Date(input.datetime).toLocaleString().substring(0, 19)}</td>
                <td>{input.description}</td>
                <td>{input.amount} kn</td>
                <td>{categoryList.filter(cat => cat.id === input.category)[0].name}</td>
                <td>{subCategoryList.filter(subC => subC.id === input.subcategory)[0].name}</td>
              </tr>
            ) : ""}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryScreen;