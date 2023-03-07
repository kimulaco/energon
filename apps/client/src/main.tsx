import { createRoot } from 'react-dom/client';
import { CssVarsProvider } from '@mui/joy/styles';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '@fontsource/public-sans';
import './assets/css/global.css';

const main = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  createRoot(document.getElementById('root') as HTMLElement).render(
    <CssVarsProvider>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </CssVarsProvider>,
  );
};

main();
