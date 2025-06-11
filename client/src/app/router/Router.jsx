import React from 'react';
import { Route, Routes } from 'react-router';
import MainPage from '../../pages/MainPage/MainPage';
import Layout from '../Layout/Layout';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/teaMap' element={<MainPage />} />
      </Route>
    </Routes>
  );
}
