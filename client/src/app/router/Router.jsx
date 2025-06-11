import React from 'react';
import { Route, Routes } from 'react-router';
import MainPage from '../../pages/MainPage/MainPage';
import Layout from '../Layout/Layout';

export default function Router({ user, setUser }) {
  return (
    <Routes>
      <Route path='/' element={<Layout user={user} setUser={setUser}/>}>
        <Route path='/teaMap' element={<MainPage />} />
      </Route>
    </Routes>
  );
}
