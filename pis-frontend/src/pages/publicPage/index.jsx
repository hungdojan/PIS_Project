import { Outlet } from 'react-router-dom';
import HeaderBar from '../../components/headerBar';
import FooterBar from '../../components/footerBar';
import MenuPage from './menu';
import HomePage from './home';

const PublicPage = (props) => {
  return (
    <div>
      <HeaderBar onRoleChange={props.onRoleChange} role={props.role} />
      <Outlet />
      <FooterBar />
    </div>
  );
};

export { PublicPage, MenuPage, HomePage };
