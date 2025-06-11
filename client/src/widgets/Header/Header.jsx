import React from 'react';
import styles from './Header.module.css';
import {NavLink} from 'react-router';
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

      {user.status === 'logged' && user.data?.role === 'admin' && (
        <NavLink
          to='/workspace'
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Рабочее пространство
        </NavLink>
      )}

      {user.status === 'logged' && user.data?.role === 'user' && (
        <NavLink
          to='/boards'
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Мои доски
        </NavLink>
      )}

      {user.status === 'logged' && user.data?.role === 'user' && (
        <NavLink
          to='/alltasks'
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Все задачи
        </NavLink>
      )}

      {user.status === 'logged' && <div>{user.data?.name}</div>}

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
