import React from 'react';
import Header from '../../widgets/Header/Header';
import { Outlet } from 'react-router';

export default function Layout({ user, setUser }) {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet />
    </>
  );
}
