import React from 'react';
import { useState } from 'react';
import { TeaApi } from '../../entities/teas/TeaApi';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import EditForm from '../../features/EditForm/EditForm';
import TeaFullCard from '../../widgets/TeaFullCard/TeaFullCard';

export default function OneTeaPage() {
  const [tea, setTea] = useState({});
  const [editMode, setEditMode] = useState(true);

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
    setEditMode((prev) => !prev)
  }

  return (
    <>
      {editMode ? (
        <>
          <TeaFullCard tea={tea} />
          <button onClick={editHeandler}>Редактировать</button>
          
        </>
      ) : (
        <EditForm tea={tea} setTea={setTea} editHeandler={editHeandler} />
      )}
    </>
  );
}
