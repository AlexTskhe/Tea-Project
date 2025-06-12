import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router';
export default function Header({ user, logoutHandler }) {
  return (
    <header className={styles.header}>
      <NavLink
        to='/'
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

      {user.status === 'logged' && <div>{user.data?.name}</div>}

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

      {user.status === 'logged' ? (
        <button className={styles.logoutBtn} onClick={logoutHandler}>
          Выйти
        </button>
      ) : (
        <NavLink to='/auth'>Войти</NavLink>
      )}
    </header>
  );
}
