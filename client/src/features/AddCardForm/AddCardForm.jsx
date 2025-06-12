import React, { useState } from 'react'
import { TeaApi } from '../../entities/teas/TeaApi';
import { useNavigate } from 'react-router';
import TeaValidator from '../../shared/utils/TeaValidator';

const defaultValue = {
  name: '',
  location: '',
  image: '',
  description: '',
};

export default function AddCardForm() {

const [inputs, setInputs] = useState(defaultValue);

const nav = useNavigate()

    function inputsHandler(e) {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  }

  const addHandler = async (e) => {
    e.preventDefault();
    const valid = TeaValidator.validate(inputs)

        try {
            if(valid.isValid) {
               const data = await TeaApi.addTea(inputs);
          console.log("Adeded data:", data);
          if (data.statusCode === 201) {
            nav("/teasPage")
          }  
            }
          
        } catch (error) {
          console.log(error);
        }
      };


  return (
     <>
      <form onSubmit={addHandler}>
        <input onChange={inputsHandler} value={inputs.name} name='name' />
        <input
          onChange={inputsHandler}
          value={inputs.location}
          name='location'
        />
        <input onChange={inputsHandler} value={inputs.image} name='image' />
        <input
          onChange={inputsHandler}
          value={inputs.description}
          name='description'
        />
        <button type='submit'>Добавить</button>
      </form>
    </>
  )
}
