import { useEffect, useState } from "react";

//Components

const DashboardScreen = ({history}) => {

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);


  return (
    <div>
      DASHBOARDssssda
    </div>
  );
};

export default DashboardScreen;