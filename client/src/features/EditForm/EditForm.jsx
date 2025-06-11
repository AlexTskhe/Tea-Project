import React, { useEffect } from 'react';

import { TeaApi } from '../../entities/teas/TeaApi';
import { useState } from 'react';
import TeaValidator from '../../shared/utils/TeaValidator';

const defaultValue = {
  name: '',
  location: '',
  image: '',
  description: '',
};

export default function EditForm({ tea, setTea }) {
  const [inputs, setInputs] = useState(tea);
  console.log(tea);

  useEffect(() => {
    if (tea) {
      setInputs(tea);
    }
  }, [tea]);


  const inputHandler = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const { isValid, error } = TeaValidator.validate(inputs);

      if (isValid) {
        const data = await TeaApi.update(tea.id, inputs);
        console.log('---------++', data);
        if (data.statusCode === 200 && data.data.accessToken) {
          // setTea((tea) => [...tea, data.data.user]);
          setInputs(data);
        } else {
          console.log(error);
        }
      } else {
        console.log('Ошибка из валидатора', error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <form onSubmit={submitHandler}>
        <input onChange={inputHandler} value={inputs.name} name='name' />
        <input
          onChange={inputHandler}
          value={inputs.location}
          name='location'
        />
        <input onChange={inputHandler} value={inputs.image} name='image' />
        <input
          onChange={inputHandler}
          value={inputs.description}
          name='description'
        />
        <button>Редактировать</button>
      </form>
    </>
  );
}
