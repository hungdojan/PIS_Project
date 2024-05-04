/*
  This original source of this code is here:
  https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import {
  PublicPage,
  MenuPage,
  ReservationPage,
  AboutPage,
  HomePage,
} from '../pages/publicPage';
import StaffPage from '../pages/staffPage';
import ManagerPage from '../pages/managerPage';
import AdminPage from '../pages/adminPage';
import OrdersPage from '../pages/ordersPage';
import LoginPage from '../pages/login';
import Logout from '../pages/logout';

const CustomRouter = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: '/',
      element: <PublicPage />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: 'menu',
          element: <MenuPage />,
        },
        {
          path: 'reservation',
          element: <ReservationPage />,
        },
        {
          path: 'about',
          element: <AboutPage />,
        },
      ],
    },
  ];

  const authorizedRoutes = [
    {
      path: '/staff',
      element: <ProtectedRoute ignoreAuth={false} />,
      children: [
        {
          path: '',
          element: <StaffPage />,
        },
        {
          path: 'manager',
          element: <ManagerPage />,
        },
        {
          path: 'admin',
          element: <AdminPage />,
        },
        {
          path: 'orders',
          element: <OrdersPage />,
        },
      ],
    },
    {
      path: '/logout',
      element: (
        <ProtectedRoute>
          <Logout />,
        </ProtectedRoute>
      ),
    },
  ];

  const nonAuthorizedRoutes = [
    {
      path: '/login',
      element: <LoginPage />,
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...authorizedRoutes,
    ...nonAuthorizedRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default CustomRouter;
