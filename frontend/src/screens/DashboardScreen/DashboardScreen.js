import { useEffect, useState } from "react";

//Components
import Navbar from "../../components/sideBarComponent/SideBarComponent";

const DashboardScreen = ({history}) => {

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);


  return (
    <div>
      <Navbar history={history}/>
      DASHBOARDssssda
    </div>
  );
};

export default DashboardScreen;