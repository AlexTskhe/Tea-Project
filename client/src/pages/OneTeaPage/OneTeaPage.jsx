import React, { useContext } from 'react';
import { useState } from 'react';
import { TeaApi } from '../../entities/teas/TeaApi';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import EditForm from '../../features/EditForm/EditForm';
import TeaFullCard from '../../widgets/TeaFullCard/TeaFullCard';
import Comments from '../../widgets/Comments/Comments';
import { UserContext } from '../../entities/User/UserContext';

export default function OneTeaPage() {
  const [tea, setTea] = useState({});
  const [editMode, setEditMode] = useState(true);
  const { user } = useContext(UserContext);

  const { id } = useParams();

  useEffect(() => {
    async function getOneTea() {
      try {
        const data = await TeaApi.getOne(id);
        if (data.statusCode === 200) {
          setTea(data.data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getOneTea();
  }, [id]);

  const editHeandler = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      {editMode ? (
        <>
          <TeaFullCard tea={tea} user={user} />
          {user?.role === 'admin' && (
            <button onClick={editHeandler}>Редактировать</button>
          )}
          <Comments tea={tea} user={user} />
        </>
      ) : (
        <EditForm tea={tea} setTea={setTea} editHeandler={editHeandler} />
      )}
    </>
  );
}
