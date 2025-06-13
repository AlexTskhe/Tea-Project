import React, { useContext } from 'react';
import { useState } from 'react';
import { TeaApi } from '../../entities/teas/TeaApi';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../../entities/User/UserContext';

export default function TeaCard({ el, deleteHandler}) {
  const [teaCard, setTeaCard] = useState(el);
  const navigate = useNavigate();
  
  const readMoreHandler = (e) => {
    navigate(`/teasPage/${el.id}`);
  };
  const {user} = useContext(UserContext)

  return (
    <>
      <div>
        <hr />
          <h3>{teaCard.name}</h3>
          <h4>{teaCard.location}</h4>
          <img src={teaCard.image} alt='Tea' width='600' height='400' />
          <h4>{teaCard.description}</h4>

        <button
          onClick={readMoreHandler}
        >
          Подробнее
        </button>

        {user?.role === 'admin' && <button
          onClick={() => {
            deleteHandler(el.id);
          }}
        >
          Удалить
        </button>}
      </div>
    </>
  );
}


