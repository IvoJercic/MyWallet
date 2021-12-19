import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBarComponentData } from './SideBarComponentData';
import { IconContext } from 'react-icons';
import './SideBarComponent.css';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/userActions";
import { useHistory } from 'react-router';

function SideBarComponent() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);


  const history=useHistory();

  const dispatch=useDispatch();

  const userLogin=useSelector((state)=>state.userLogin);
  const {userInfo} =userLogin;
  const handleLogout=()=>{
    dispatch(logout());
    history.push("/");
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          MyWallet
          <span className="navbar__logout">
            <button
            onClick={handleLogout}
            >
              LOGOUT
            </button>
          </span>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SideBarComponentData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBarComponent;