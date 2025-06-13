import React from 'react';
import styles from './TeaFullCard.module.css';

export default function TeaFullCard({ tea }) {
  return (
    <>
      <div className={styles.card}>
        <h1>{tea.name}</h1>
        <h4 className={styles.cardCoordinates} > {tea.location}</h4>

        <img src={tea.image} alt='Tea' width='600' height='400' />

        <p>{tea.description}</p>
      </div>
    </>
  );
}
