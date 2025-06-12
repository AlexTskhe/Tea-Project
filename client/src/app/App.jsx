import React from 'react';
import { useState } from 'react';
// import './App.css';
import Router from './router/Router';

function App() {
  const [user, setUser] = useState({});

  return <Router user={user} setUser={setUser} />;
}

export default App;
