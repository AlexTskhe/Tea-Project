import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TeaApi } from "../../entities/teas/TeaApi";
import TeaCard from "../../widgets/TeaCard/TeaCard";
import { useNavigate } from "react-router";

export default function TeaPage({user}) {
  const [teas, setTeas] = useState([]);

  const nav = useNavigate()

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
      <button onClick={()=>{nav('/addCard')}}>Добавить</button>
      {teas.map((el) => (
        <TeaCard key={el.id} el={el} deleteHandler={deleteHandler} user={user} />
      ))}
    </>
  );
}
