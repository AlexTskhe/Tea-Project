import React from 'react';
import { useState } from 'react';
import { TeaApi } from '../../entities/teas/TeaApi';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import EditForm from '../../features/EditForm/EditForm';

export default function OneTeaPage() {
  const [tea, setTea] = useState({});

  const { id } = useParams();
  console.log(' id:', id);

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

  return (
    <>
      <div>{tea.name}</div>
      <EditForm tea={tea} setTea={setTea} />
    </>
  );
}
