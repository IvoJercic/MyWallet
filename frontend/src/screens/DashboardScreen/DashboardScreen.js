import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import drilldow from "highcharts/modules/drilldown";
drilldow(Highcharts);

//Components

const DashboardScreen = ({ history }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [inputList, setInputList] = useState([]);


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      history.push("/");
    }
    else {
      getAllSubCategories();
      getAllCategories();
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

  const makePieChartObjectForCategories = (type) => {
    let tempArray = []

    categoryList.forEach(category => {
      let inputsForCurrentCategory = inputList.filter(input => input?.category === category?.id && category.type===type);
      if (inputsForCurrentCategory.length == 1) {
        tempArray.push({
          name: category.name,
          y: inputsForCurrentCategory[0].amount,
          drilldown: category.name,
          color: category.color
        })
      }
      else if (inputsForCurrentCategory.length > 0) {
        tempArray.push({
          name: category.name,
          y: inputsForCurrentCategory.reduce((a, b) => a?.amount + b?.amount),
          drilldown: category.name,
          color: category.color
        })
      }
    });
    return tempArray;
  }

  const makePieChartDrillDownObjectForCategories = (type) => {
    let tempArray = [];

    let subTempArray=[];
    categoryList.forEach(category => {
      if(category.type===type){
        subTempArray=[];
        let subcategoriesForCurrentCategory = subCategoryList.filter(subC => subC?.category === category?.id);
  
        subcategoriesForCurrentCategory.forEach(subcategory => {
          let inputsForCurrentSubcategory = inputList.filter(input => input?.subcategory === subcategory?.id);
          if (inputsForCurrentSubcategory.length == 1) {
            subTempArray.push(
              [subcategory.name,inputsForCurrentSubcategory[0].amount]
            )
          }
          else if (inputsForCurrentSubcategory.length > 0) {
            subTempArray.push(
              [subcategory.name,inputsForCurrentSubcategory.reduce((a, b) => a?.amount + b?.amount)]
            )
          }
        });
        tempArray.push({
          id:category.name,
          data:subTempArray
        })
      }
    });
    return tempArray;
  }

  const optionsPieChartExpenses = {
    title: {
      text: 'Amount of expenses per category'
    },
    subtitle: {
      text: 'Click the slices to view expenses per subcategories'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      },
      point: {
        valueSuffix: 'kn'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f} kn'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    chart: {
      type: "pie",
      // events: {
      //   click: function (e) {
      //     console.log("test");
      //   },
      //   dropdown: function (e) {
      //     console.log("test");
      //   }
      // }
    },
    series: [
      {
        data: makePieChartObjectForCategories("Expense")
      }
    ],
    drilldown: {
      series: makePieChartDrillDownObjectForCategories("Expense")
    }
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={optionsPieChartExpenses} />
    </div>
  );
};

export default DashboardScreen;