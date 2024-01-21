import { lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';

const StartPage = lazy(() => import('../pages/StartPage/StartPage'));
const GamePage = lazy(() => import('../pages/GamePage/GamePage'));

export const App = () => {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StartPage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="*" element={<StartPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
};
