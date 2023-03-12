import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LayoutDefault } from './layouts/default';
import { LayoutDashboard } from './layouts/dashboard';
import PageIndex from './pages/Index';
import PageLogin from './pages/login/Index';
import PageNotFound from './pages/404';
import PageError from './pages/error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/dashbord" />,
  },

  {
    path: '/dashbord',
    element: <LayoutDashboard />,
    children: [
      {
        path: '/dashbord',
        element: <PageIndex />,
        index: true,
      },
    ],
  },

  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        path: '/login',
        element: <PageLogin />,
      },
      {
        path: '/error',
        element: <PageError />,
      },
      {
        path: '/404',
        element: <PageNotFound />,
      },
    ],
  },

  {
    path: '/*',
    element: <Navigate replace to="/404" />,
  },
]);
