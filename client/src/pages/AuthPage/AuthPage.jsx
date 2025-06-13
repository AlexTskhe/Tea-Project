import React from 'react'
import SingUpForm from '../../features/SingUpForm/SignUpForm'
import LoginForm from '../../features/LoginForm/LoginForm'
import styles from './AuthPage.module.css'

export default function AuthPage({isAuthProp, setUser} ) {
  return (
    <div className={styles.authBackground}>
   {isAuthProp === 'login'? <LoginForm setUser={setUser}/>: <SingUpForm setUser={setUser}/>}   
    </div>
  )
}
