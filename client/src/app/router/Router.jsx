import React from "react";
import { Route, Routes } from "react-router";
import MainPage from "../../pages/MainPage/MainPage";
import Layout from "../Layout/Layout";
import TeaPage from "../../pages/TeaPage/TeaPage";
import OneTeaPage from "../../pages/OneTeaPage/OneTeaPage";

import SingUpForm from "../../features/SingUpForm/SingUpForm";
import LoginForm from "../../features/LoginForm/LoginForm";
import AddCard from "../../pages/AddCard/AddCard";


export default function Router({ user, setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Layout user={user}/>}>
        <Route path="/teaMap" element={<MainPage />} />
        <Route path="/singup" element={<SingUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/teasPage" element={<TeaPage />} />
        <Route path="/teasPage/:id" element={<OneTeaPage />} />
        <Route path="/addCard" element={<AddCard />} />
      </Route>
    </Routes>
  );
}
