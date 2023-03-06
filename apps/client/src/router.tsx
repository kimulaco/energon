import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutDefault from './layouts/Default';
import PageIndex from './pages/Index';
import PageLogin from './pages/login/Index';
import PageNotFound from './pages/404';
import PageError from './pages/error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        path: '/',
        element: <PageIndex />,
        index: true,
      },
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
      {
        path: '/*',
        element: <Navigate replace to="/404" />,
      },
    ],
  },
]);
