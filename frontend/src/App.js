import './App.css';
import {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Screens
import HomeScreen from "./screens/HomeScreen";

//Components

import LoginComponent from './components/loginComponent/LoginComponent';

import NavBar from "./components/NavBar";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Logout from './components/Logout';
import RegisterScreen from './components/registerComponent/RegisterComponent';
import Header from './components/Header';
import RegisterComponent from './components/registerComponent/RegisterComponent';
import DashboardComponent from './components/dashboardComponent/DashboardComponent';

function App() {

  const [sideToggle,setSideToggle] = useState(false);

  const user= useSelector(selectUser);
  return (
    <Router>
      {/* <Header/> */}
      {/* {user? <Logout />: <Login/> } */}
    {/* //   <NavBar click={()=>setSideToggle(true)}/>     
    //   <SideDrawer show={sideToggle} click={()=>setSideToggle(false)}/>
    //   <BackDrop show={sideToggle} click={()=>setSideToggle(false)}/> */}
      <main>
        <Switch>
          {/* <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} /> */}

          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/register" component={RegisterComponent} />
          <Route exact path="/dashboard" component={DashboardComponent} />


        </Switch>
      </main>
    </Router>
  );
}

export default App;