import { useEffect, useState } from "react";

//Components
import CreateCategoryComponent from "../../components/createCategoryComponent/CreateCategoryComponent";

const CategoriesScreen = ({history}) => {

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);


  return (
    <div>
      <CreateCategoryComponent/>
    </div>
  );
};

export default CategoriesScreen;