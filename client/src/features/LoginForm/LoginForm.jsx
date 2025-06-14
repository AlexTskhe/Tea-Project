import React from 'react'
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router';

import { UserApi } from "../../entities/User/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import styles from './LoginForm.module.css'

const INITIAL_INPUT_DATA = {
  mail: "",
  password: "",
};

export default function LoginForm({setUser}) {
     const [inputs, setInputs] = useState(INITIAL_INPUT_DATA);

  const navigate = useNavigate()

  const changeHandler = (event) => {
    setInputs((pre) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await UserApi.login(inputs)
      console.log("LogForm data:", data)
      if (data.statusCode === 200 && data.data.accessToken) {
        setUser((pre) => ({...pre, ...data.data.user}))
        setAccessToken(data.data.accessToken)
        navigate('/teaMap')  
      } else {
        console.log('============>>', data.response.data)
        return alert(data.response.data.error)
      }
      navigate('/teaMap')
    } catch (error) {
      console.log(error)
      return alert(error.response.data.error)
    }
  };

  return (
  <div className={styles.formContainer}>
      <form onSubmit={sumbitHandler} className={styles.form}>
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