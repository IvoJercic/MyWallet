import React, { useEffect, useState } from "react";
//CSS
import './InputScreen.css';
//Components
import CreateInputComponent from "../../components/createInputComponent/CreateInputComponent";
import * as FaIcons from 'react-icons/fa';
import axios from "axios";


const InputScreen = ({ history }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [refresher,setRefresher]=useState(false);



  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      history.push("/");
    }
    else {      
      getAllCategories();
      getAllInputs();
    }
  }, []);

  useEffect(()=>{
    getAllInputs();
  },[refresher]);

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
            categoryList={categoryList} 
            setRefresher={setRefresher}/>
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
                      style={{background:categoryList.filter(cat=>cat.id===input.category)[0].color}}
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
                    </div>
                  ).reverse().slice(0, 5)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputScreen;