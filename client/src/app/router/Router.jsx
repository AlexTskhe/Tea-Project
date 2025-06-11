import React from "react";
import { Route, Routes } from "react-router";
import MainPage from "../../pages/MainPage/MainPage";
import Layout from "../Layout/Layout";
import TeaPage from "../../pages/TeaPage/TeaPage";
import OneTeaPage from "../../pages/OneTeaPage/OneTeaPage";

export default function Router({ user, setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Layout user={user}/>}>
        <Route path="/teaMap" element={<MainPage />} />
        <Route path="/teasPage" element={<TeaPage />} />
        <Route path="/teasPage/:id" element={<OneTeaPage />} />
      </Route>
    </Routes>
  );
}
