import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarComponentData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiOutlineDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <AiIcons.AiOutlineProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <AiIcons.AiOutlineGroup />,
    cName: 'nav-text'
  },
  {
    title: 'Input',
    path: '/input',
    icon: <AiIcons.AiOutlinePlusSquare />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/history',
    icon: <AiIcons.AiOutlineHistory />,
    cName: 'nav-text'
  },  
];