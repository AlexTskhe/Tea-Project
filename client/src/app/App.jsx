import React from 'react';
import { useState } from 'react';
// import './App.css';
import Router from './router/Router';
import { useEffect } from 'react';
import { setAccessToken } from '../shared/lib/axiosInstance';
import { UserApi } from '../entities/User/UserApi';
import { UserContext } from '../entities/User/UserContext';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await UserApi.refresh();
        if (data.statusCode === 200 && data.data.accessToken) {
          // ! ! ! ! ! !
          setUser((pre) => ({ ...pre, ...data.data.user }));
          setAccessToken(data.data.accessToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    // <ChakraProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Router user={user} setUser={setUser} />
      </UserContext.Provider>
    // </ChakraProvider>
  );
}

export default App;
