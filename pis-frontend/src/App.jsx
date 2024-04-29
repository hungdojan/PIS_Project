import { Route, Routes } from 'react-router-dom';
import { PublicPage, HomePage, MenuPage, ReservationPage } from './pages/publicPage';
import StaffPage from './pages/staffPage';
import LoginPage from './pages/login';
import ManagerPage from './pages/managerPage';
import AdminPage from './pages/adminPage';
import './App.css';
import { NotFound } from './components';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicPage />}>
          <Route path="menu" element={<MenuPage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="staff" element={<StaffPage />}></Route>
        <Route path="manager" element={<ManagerPage />}></Route>
        <Route path="admin" element={<AdminPage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
