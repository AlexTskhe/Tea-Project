import React from 'react';
import { useState } from 'react';
// import './App.css';
import Router from './router/Router';
import { useEffect } from 'react';
import { setAccessToken } from '../shared/lib/axiosInstance';
import { UserApi } from '../entities/User/UserApi';

function App() {
  const [user, setUser] = useState({});
   useEffect(() => {
    const getUser = async () => {
      try {
        const data = await UserApi.refresh()
        if (data.statusCode === 200 && data.data.accessToken) {
          // ! ! ! ! ! !
          setUser((pre) => ({...pre, ...data.data.user}))
          setAccessToken(data.data.accessToken)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  return <Router user={user} setUser={setUser} />;
}

export default App;
