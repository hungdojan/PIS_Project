import { Outlet } from 'react-router-dom';
import HeaderBar from '../../components/headerBar';
import FooterBar from '../../components/footerBar';
import MenuPage from './menu';
import HomePage from './home';
import ReservationPage from './reservation';
import AboutPage from './about';
import './PublicPage.css';
import React from "react";

const PublicPage = (props) => {
  return (
    <div className="page">
      <div className="bg">
      </div>
      <HeaderBar/>
      <div className="main">
        <Outlet/>
      </div>
      <FooterBar/>
    </div>
  );
};

export {PublicPage, MenuPage, HomePage, ReservationPage, AboutPage};
