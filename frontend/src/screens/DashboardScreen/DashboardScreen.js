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
  const [accountList,setAccountList]=useState([]);


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      history.push("/");
    }
    else {
      getAllSubCategories();
      getAllCategories();
      getAllInputs();
      getAllAccounts();

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

  const getAllAccounts = async () => {
    const { data } = await axios.get(
      "/api/account/" + JSON.parse(localStorage.getItem("userInfo"))._id
    );
    setAccountList(data.accountsList);
  }

  const makePieChartObjectForCategories = (type) => {
    let tempArray = []

    categoryList.forEach(category => {
      let inputsForCurrentCategory = inputList.filter(input => input?.category === category?.id && category.type === type);
      if (inputsForCurrentCategory.length == 1) {
        // console.log("PRVI IF"+inputsForCurrentCategory[0].amount);
        tempArray.push({
          name: category.name,
          y: inputsForCurrentCategory[0].amount,
          drilldown: category.name,
          color: category.color
        })
      }
      else if (inputsForCurrentCategory.length > 1) {
        // console.log("DRUGI IF:"+inputsForCurrentCategory.map(item=> item.amount).reduce((a,b)=>a+b));
        // console.log(inputsForCurrentCategory);
        tempArray.push({
          name: category.name,
          y: inputsForCurrentCategory.map(item => item.amount).reduce((a, b) => a + b),
          drilldown: category.name,
          color: category.color
        })
      }
    });

    return tempArray;
  }

  const makePieChartObjectForExpensesVsIncome = (type) => {
    let temp = [];
    let tempExpenses = inputList.filter(input => categoryList?.filter(cat => cat?.id === input?.category)[0]?.type == "Expense");
    let tempIncome = inputList.filter(input => categoryList?.filter(cat => cat?.id === input?.category)[0]?.type == "Income");

    if (tempExpenses.length == 1) {
      temp.push({
        name: "Expense",
        y: tempExpenses[0]?.amount
      })
    }
    else if (tempExpenses.length == 0) {
      temp.push({
        name: "Expense",
        y: 0
      })
    }
    else {
      temp.push({
        name: "Expense",
        y: tempExpenses.map(item => item.amount).reduce((a, b) => a + b)
      })
    }

    if (tempIncome.length == 1) {
      temp.push({
        name: "Income",
        y: tempIncome[0]?.amount
      })
    }
    else if (tempIncome.length == 0) {
      temp.push({
        name: "Income",
        y: 0
      })
    }
    else {
      temp.push({
        name: "Income",
        y: tempIncome.map(item => item.amount).reduce((a, b) => a + b)
      })
    }
    return temp;
  }

  const makePieChartDrillDownObjectForCategories = (type) => {
    let tempArray = [];

    let subTempArray = [];
    categoryList.forEach(category => {
      if (category.type === type) {
        subTempArray = [];
        let subcategoriesForCurrentCategory = subCategoryList.filter(subC => subC?.category === category?.id);

        subcategoriesForCurrentCategory.forEach(subcategory => {
          let inputsForCurrentSubcategory = inputList.filter(input => input?.subcategory === subcategory?.id);
          if (inputsForCurrentSubcategory.length == 1) {
            subTempArray.push(
              [subcategory.name, inputsForCurrentSubcategory[0].amount]
            )
          }
          else if (inputsForCurrentSubcategory.length > 1) {
            subTempArray.push(
              [subcategory.name, inputsForCurrentSubcategory.map(item => item.amount).reduce((a, b) => a + b)]
            )
          }
        });
        tempArray.push({
          id: category.name,
          data: subTempArray
        })
      }
    });
    return tempArray;
  }

  const makerAreaChartObjectForYear = (type) => {
    try {
      let tempArray = [];
      for (let i = 1; i < 13; i++) {
        let tempArrayForThisMonth = inputList.filter(input => new Date(input?.datetime).getMonth() == i - 1 && categoryList.filter(cat => cat?.id === input?.category)[0]?.type == type);
        if (tempArrayForThisMonth.length == 1) {
          tempArray.push(tempArrayForThisMonth[0].amount);
        }
        if (tempArrayForThisMonth.length == 0) {
          tempArray.push(0);
        }
        else if (tempArrayForThisMonth.length > 1) {
          tempArray.push(tempArrayForThisMonth.map(item => item.amount).reduce((a, b) => a + b));

        }
      }
      // console.log("tempArray");

      // console.log(tempArray);
      return tempArray;
    } catch (error) {
      console.error(error);
    }

  }

  const makeAreaChartDiff = () => {
    const expensesPerMonths = makerAreaChartObjectForYear("Expense")
    const incomePerMonths = makerAreaChartObjectForYear("Income")

    let result = [];
    for (let i = 0; i < 12; i++) {
      result.push(incomePerMonths[i] - expensesPerMonths[i])
    }
    return result
  }


  const makePieChartObjectAccounts = () => {
    let temp=[];
    accountList.forEach(element => {
      temp.push({name:element.name,y:element.amount})
    });    
    return temp    
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
          format: '{point.name}: {point.y:.2f} kn'
        }
      }
    },

    tooltip: {
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} kn</b><br/>'
    },
    chart: {
      type: "pie",
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

  const optionsPieChartExpensesVsIncome = {
    title: {
      text: 'Expense vs income'
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
          format: '{point.name}: {point.y:.2f} kn'
        }
      }
    },

    tooltip: {
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}kn</b><br/>'
    },
    chart: {
      type: "pie",
    },
    series:
    {
      data: makePieChartObjectForExpensesVsIncome()
    }
  };

  const optionsLineChartForYear = {
    title: {
      text: 'Expenses and income during the year'
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
          format: '{point.name}: {point.y:.2f} kn'
        }
      }
    },

    tooltip: {
      pointFormat: '<span style="color:{point.color}">{point.name}</span><b>{point.y:.2f} kn</b><br/>'
    },
    chart: {
      type: "area",

    },
    xAxis: {
      allowDecimals: false,
      labels: {
        formatter: function () {
          return this.value; // clean, unformatted number for year
        }
      },
    },
    yAxis: {
      title: {
        text: 'Amount (kn)'
      },
    },
    plotOptions: {
      area: {
        pointStart: 1,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    series: [
      {
        name: 'Expenses',
        data: makerAreaChartObjectForYear("Expense")
      },
      {
        name: 'Income',
        data: makerAreaChartObjectForYear("Income")
      }
    ]
  };

  const optionsAreaChartDifference = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Area chart with negative values'
    },
    xAxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'John',
      data: makeAreaChartDiff()
    }
    ]
  }

  const optionsPieChartAccounts = {
    title: {
      text: 'Amount per accounts'
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
          format: '{point.name}: {point.y:.2f} kn'
        }
      }
    },

    tooltip: {
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}kn</b><br/>'
    },
    chart: {
      type: "pie",
    },
    series:
    {
      data: makePieChartObjectAccounts()
    }
  };


  return (
    <>
      <div className="chartScreen">
          <HighchartsReact highcharts={Highcharts} options={optionsPieChartExpenses} />
          <HighchartsReact highcharts={Highcharts} options={optionsLineChartForYear} />
          <HighchartsReact highcharts={Highcharts} options={optionsPieChartExpensesVsIncome} />
          <HighchartsReact highcharts={Highcharts} options={optionsAreaChartDifference} />      
          <HighchartsReact highcharts={Highcharts} options={optionsPieChartAccounts} />
      </div>
    </>
  );
};

export default DashboardScreen;