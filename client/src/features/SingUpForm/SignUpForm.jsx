import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import {UserValidator} from '../../entities/User/User.validator'
import {UserApi} from '../../entities/User/UserApi'
import { setAccessToken } from '../../shared/lib/axiosInstance';
import styles from './SignUpForm.module.css'


const INITIAL_INPUT_DATA = {
  name: '',
  email: '',
  password: ''
}


export default function SingUpForm({setUser}) {
    const [inputs, setInputs] = useState(INITIAL_INPUT_DATA)

    const navigate = useNavigate()
    const changeHandler = (event) => { //обработчик инпута
    setInputs((pre) => ({...pre, [event.target.name]: event.target.value}))
  }
  const submitHandler = async (e) => { //обработчик кнопки в форме
    e.preventDefault() //функция, которая запрещает перезагрузку страницы, после нажатия на кнопку в форме
    try {
      
        const fullUserData = {...inputs, role: 'admin'}
      const { isValid, error } = UserValidator.validate(fullUserData)
      
      if (isValid) {
        const data = await UserApi.signup(fullUserData)
        // console.log('-------->')
        
        if (data.statusCode === 201 && data.data.accessToken) {
          
          setUser(data.data.user) 
          
          setAccessToken(data.data.accessToken)
          
          navigate('/teaMap') 
           
        } else {
          return alert('Ошибка')
        }
      } else {
        console.log('Ошибка из валидатора', error)
        return alert(error)
      }
    } catch (error) {
      // console.log('~~~~~~>>', error)
      return alert(error)
    }
  }
  return (
     <div className={styles.formContainer}>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="name">
            Login
          </label>
          <input
            className={styles.formControl}
            type="text"
            id="name"
            placeholder="Enter name"
            name="name"
            value={inputs.name}
            onChange={changeHandler}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="email">
            Email address
          </label>
          <input
            className={styles.formControl}
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
            value={inputs.email}
            onChange={changeHandler}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="password">
            Password
          </label>
          <input
            className={styles.formControl}
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={changeHandler}
          />
        </div>

        <button className={styles.buttonSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

