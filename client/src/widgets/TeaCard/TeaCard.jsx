import React from "react";
import { useState } from "react";
import { TeaApi } from "../../entities/teas/TeaApi";
import { Link } from "react-router";


export default function TeaCard({ el, deleteHandler }) {
  const [teaCard, setTeaCard] = useState(el);
const [toggle, setToggle] = useState(true);

const toggleHandler = () => {
    setToggle((toggle) => !toggle);
  };

  const inputHandler = (e) => {
    setTeaCard((teaCard) => ({ ...teaCard, [e.target.name]: e.target.value }));
  };

//

   const updateHandler = async () => {
      try {
        const data = await TeaApi.update(el.id, teaCard);
        console.log("Updated data:", data);
        if (data.statusCode === 200) {
          toggleHandler();
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <div>
        <hr />
        
        {toggle ? (
          <>
            <h3>{teaCard.name}</h3>
        <h4>{teaCard.location}</h4>
        <h4>{teaCard.image}</h4>
        <h4>{teaCard.description}</h4>
          </>
        ) : (
          <>
            <input
              onChange={inputHandler}
              value={teaCard.name}
              name="name"
            />
            <input
              onChange={inputHandler}
              value={teaCard.location}
              name="location"
            />
            <input
              onChange={inputHandler}
              value={teaCard.image}
              name="image"
            />
            <input
              onChange={inputHandler}
              value={teaCard.description}
              name="description"
            />
            
          </>
        )}

        <hr />
        {/* {toggle ? <button onClick={()=>{toggleHandler()}}>Изменить</button> : <button onClick={()=>{updateHandler}}>Сохранить</button>} */}

        <Link  to={`/teasPage/${el.id}`} >Изменить</Link>

        <button onClick={()=>{deleteHandler(el.id)}}>Удалить</button>
      </div>
    </>
  );
}
