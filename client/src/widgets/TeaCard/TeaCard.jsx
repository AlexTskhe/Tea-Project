import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './TeaCard.module.css';
import { UserContext } from '../../entities/User/UserContext';

export default function TeaCard({ el, deleteHandler }) {
  const [teaCard, setTeaCard] = useState(el);
  const navigate = useNavigate();

  const readMoreHandler = (e) => {
    navigate(`/teasPage/${el.id}`);
  };
  
  const { user } = useContext(UserContext);

  return (
<div className={styles.card}>
  <h3 className={styles.cardHeader}>{teaCard.name}</h3>
  <h4 className={styles.cardCoordinates}>{teaCard.location}</h4>
  <img src={teaCard.image} alt="Tea" />

  <p className={styles.cardDescription}>{teaCard.description}</p>

  <div className={styles.cardActions}>
    <button
      aria-label="Подробнее"
      onClick={readMoreHandler}
      className={`${styles.readMoreBtn} readMoreBtn`}
      type="button"
    >
      Подробнее
    </button>

    {user?.role === 'admin' && (
      <button
        aria-label="Удалить"
        onClick={() => deleteHandler(el.id)}
        className={`${styles.deleteBtn} deleteBtn`}
        type="button"
      >
        Удалить
      </button>
    )}
  </div>
</div>
  );
}