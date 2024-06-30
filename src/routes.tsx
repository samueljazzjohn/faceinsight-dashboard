import { RouteObject } from 'react-router-dom';

import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
// import withAuth from './auth/withAuth';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      // {
      //   path: 'dashboard',
      //   element: <ProtectedRoute component={DashboardPage} />,
      // },
    ],
  },
];

export default routes;
