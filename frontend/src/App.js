import './App.css';
import {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Screens
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import CategoriesScreen from './screens/CategoriesScreen/CategoriesScreen';
import InputScreen from './screens/InputScreen/InputScreen';

//Components
import SideBarComponent from "../src/components/sideBarComponent/SideBarComponent";

function App() {


  // const user= useSelector(selectUser);
  return (
    <Router>
      <main>
      <SideBarComponent />
        <Switch>
          {/* <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} /> */}
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/dashboard" component={DashboardScreen} />
          <Route exact path="/categories" component={CategoriesScreen} />
          <Route exact path="/input" component={InputScreen} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;