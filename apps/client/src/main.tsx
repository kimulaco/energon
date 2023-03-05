import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutDefault from './layouts/Default';
import PageIndex from './pages/Index';
import PageLogin from './pages/login/Index';

const main = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  const router = createBrowserRouter([
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
      ],
    },
  ]);

  createRoot(document.getElementById('root') as HTMLElement).render(
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>,
  );
};

main();
