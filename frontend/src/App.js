import './App.css';
import {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Screens
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import CategoriesScreen from './screens/CategoriesScreen/CategoriesScreen';

//Components
import SideBarComponent from "../src/components/sideBarComponent/SideBarComponent";

function App() {

  const [sideToggle,setSideToggle] = useState(false);

  // const user= useSelector(selectUser);
  return (
    <Router>
      {/* <Header/> */}
      {/* {user? <Logout />: <Login/> } */}
    {/* //   <NavBar click={()=>setSideToggle(true)}/>     
    //   <SideDrawer show={sideToggle} click={()=>setSideToggle(false)}/>
    //   <BackDrop show={sideToggle} click={()=>setSideToggle(false)}/> */}
      <main>
      <SideBarComponent />
        <Switch>
          {/* <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} /> */}
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/dashboard" component={DashboardScreen} />
          <Route exact path="/categories" component={CategoriesScreen} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;