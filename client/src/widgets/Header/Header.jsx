import React, { useEffect } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router';
export default function Header({ user, logoutHandler }) {
  return (
    <header className={styles.header}>
      <NavLink
        to='/teaMap'
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        Главная
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
