import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TeaApi } from '../../entities/teas/TeaApi';
import TeaCard from '../../widgets/TeaCard/TeaCard';
import { useNavigate } from 'react-router';
import { UserContext } from '../../entities/User/UserContext';
import styles from './TeaPage.module.css';

export default function TeaPage() {
  const [teas, setTeas] = useState([]);
  const nav = useNavigate();

  const { user } = useContext(UserContext);
  async function deleteHandler(id) {
    try {
      const data = await TeaApi.delete(id);
      if (data.statusCode === 200) {
        setTeas((teas) => teas.filter((el) => el.id !== id));
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } //
  }

  useEffect(() => {
    const getTeas = async () => {
      try {
        const { data } = await TeaApi.getAll();
        setTeas(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTeas();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardsWrapper}>
          {user?.role === 'admin' && (
            <button
              onClick={() => nav('/addCard')}
              className={styles.addButton}
            >
              Добавить
            </button>
          )}

          <div className={styles.cardList}>
            {teas.map((el) => (
              <TeaCard
                key={el.id}
                el={el}
                deleteHandler={deleteHandler}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
