import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { TeaApi } from '../../entities/teas/TeaApi';
import TeaCard from '../../widgets/TeaCard/TeaCard';

export default function TeaPage() {
    const [teas, setTeas] = useState([]);

    async function deleteHandler(id) {
    try {
      const data = await TeaApi.delete(id);
      console.log(" data:", data);
      if (data.statusCode === 200) {
        setTeas((teas) => teas.filter((el) => el.id !== Number(data.data)));
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } //
  }


 


    useEffect(()=>{

        const getTeas = async () => {
            try {
                const { data } = await TeaApi.getAll();
                setTeas(data)
            } catch (error) {
                console.log(error);
            }
        }
        getTeas();
    },[])

  return (
    <>
    {teas.map((el)=>
   
        <TeaCard key={el.id} el={el} deleteHandler={deleteHandler} />
    )}
    </>
  )
}
