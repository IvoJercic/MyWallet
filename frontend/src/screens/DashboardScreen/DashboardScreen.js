import React,{ useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

//Components

const DashboardScreen = ({history}) => {

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);


  const options={
    series:[
      {
        name:"Profit",
        data:[100,200,300,400,200,300,300,400],
      },
    ]
  }


  return (
    <div>
      DASHBOARDssssda
      
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
  );
};

export default DashboardScreen;