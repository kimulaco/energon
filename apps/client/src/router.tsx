import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutDefault from './layouts/Default';
import PageIndex from './pages/Index';
import PageNotFound from './pages/404';
import PageLogin from './pages/login/Index';

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
