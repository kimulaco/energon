import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const main = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  createRoot(document.getElementById('root') as HTMLElement).render(
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>,
  );
};

main();
