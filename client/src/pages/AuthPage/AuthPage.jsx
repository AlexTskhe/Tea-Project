import React from 'react'
import SingUpForm from '../../features/SingUpForm/SignUpForm'
import LoginForm from '../../features/LoginForm/LoginForm'

export default function AuthPage({isAuthProp, setUser} ) {
  return (
    <>
   {isAuthProp === 'login'? <LoginForm setUser={setUser}/>: <SingUpForm setUser={setUser}/>}   
    </>
  )
}
