import { useEffect, useState } from "react";

//Components
import Navbar from "../../components/navbarComponent/NavbarComponent";

const DashboardScreen = ({history}) => {

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);


  return (
    <div>
      <Navbar />
      DASHBOARDssssda
    </div>
  );
};

export default DashboardScreen;