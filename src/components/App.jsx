import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';

const StartPage = lazy(() => import('../pages/StartPage/StartPage'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="*" element={<StartPage />} />
      </Route>
    </Routes>
  );
};
