import React, { useEffect } from 'react';
import styles from './Header.module.css';
import { NavLink, useNavigate } from 'react-router';
import { UserApi } from '../../entities/User/UserApi';
export default function Header({ user, setUser }) {
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const data = await UserApi.logout()
      if (data.statusCode === 200) {
        setUser(() => ({}))
        navigate('/')
      } else {
        console.log(data.error)
      }
    } catch (error) {
      console.log(error)
      return alert(error)
    }
  }
  return (
    <header className={styles.header}>
      <NavLink
        to='/teaMap'
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        Чайная карта
      </NavLink>

      <NavLink
        to='/teasPage'
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        Все чаи
      </NavLink>

      {user?.name && <div>{user.name}</div>}

      {user?.name ? (
        <button className={styles.logoutBtn} onClick={logoutHandler}>
          Выйти
        </button>
      ) : (
        <>
         <NavLink
        to='/login'
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        Вход
      </NavLink>

      <NavLink
        to='/singup'
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        Регистрация
      </NavLink>
        </>
      )}
    </header>
  );
}
