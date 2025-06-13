import React from 'react';
import { Route, Routes } from 'react-router';
import MainPage from '../../pages/MainPage/MainPage';
import Layout from '../Layout/Layout';
import TeaPage from '../../pages/TeaPage/TeaPage';
import OneTeaPage from '../../pages/OneTeaPage/OneTeaPage';
import AddCard from '../../pages/AddCard/AddCard';
import AuthPage from '../../pages/AuthPage/AuthPage';
import ProtectedRoute from '../../shared/hocs/ProtectedRoute';

export default function Router({ user, setUser }) {
  return (
    <Routes>
      <Route path='/' element={<Layout user={user} setUser={setUser} />}>
        <Route path='/teaMap' element={<MainPage />} />
        <Route
          path='/signup'
          element={<AuthPage isAuthProp='signup' setUser={setUser} />}
        />
        <Route
          path='/login'
          element={<AuthPage isAuthProp='login' setUser={setUser} />}
        />
        <Route path='/teasPage' element={<TeaPage user={user} />} />
        <Route path='/teasPage/:id' element={<OneTeaPage user={user} />} />
        <Route
          path='/addCard'
          element={
            <ProtectedRoute
              isAuthenticated={user?.role === 'admin'}
              redirectTo='/teaMap'
            >
              <AddCard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
