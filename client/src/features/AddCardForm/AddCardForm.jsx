import React, { useContext, useState } from 'react'
import { TeaApi } from '../../entities/teas/TeaApi';
import { useNavigate } from 'react-router';
import TeaValidator from '../../shared/utils/TeaValidator';
import { UserContext } from '../../entities/User/UserContext';
import styles from './AddCardForm.module.css';


const defaultValue = {
  name: '',
  location: '',
  image: '',
  description: '',
};

export default function AddCardForm() {
const {user} = useContext(UserContext)
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
  <div className={styles.formContainer}>
    <form onSubmit={addHandler}>
      <input
        className={styles.input}
        onChange={inputsHandler}
        value={inputs.name}
        name='name'
        placeholder='Название чая'
      />
      <input
        className={styles.input}
        onChange={inputsHandler}
        value={inputs.location}
        name='location'
        placeholder='Происхождение'
      />
      <input
        className={styles.input}
        onChange={inputsHandler}
        value={inputs.image}
        name='image'
        placeholder='URL изображения'
      />
      <input
        className={styles.input}
        onChange={inputsHandler}
        value={inputs.description}
        name='description'
        placeholder='Описание'
      />
      <button type='submit' className={styles.button}>Добавить</button>
    </form>
  </div>
)
}
