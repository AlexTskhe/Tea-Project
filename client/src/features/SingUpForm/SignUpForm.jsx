import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import {UserValidator} from '../../entities/User/User.validator'
import {UserApi} from '../../entities/User/UserApi'
import { setAccessToken } from '../../shared/lib/axiosInstance';


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
      
        const fullUserData = {...inputs, role: 'user'}
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
      console.log('~~~~~~>>', error)
      return alert(error)
    }
  }
  return (
   <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control 
          type="text" placeholder="Enter name" name='name'
          value={inputs.login} onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" placeholder="Enter email" name='email'
          value={inputs.email} onChange={changeHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" placeholder="Password" name='password'
          value={inputs.password} onChange={changeHandler}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}


// import React, { useState } from 'react';

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Heading,
//   Text,
//   Input,
//   Button,
//   Stack,
//   FormControl,
//   FormLabel,
// } from '@chakra-ui/react';
// import { useNavigate } from 'react-router';
// import { UserValidator } from '../../entities/User/User.validator';
// import { UserApi } from '../../entities/User/UserApi';
// import { setAccessToken } from '../../shared/lib/axiosInstance';

// const INITIAL_INPUT_DATA = {
//   name: '',
//   email: '',
//   password: '',
// };

// export default function SingUpForm({ setUser }) {
//   const [inputs, setInputs] = useState(INITIAL_INPUT_DATA);
//   const navigate = useNavigate();

//   const changeHandler = (event) => {
//     setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const fullUserData = { ...inputs, role: 'user' };
//       const { isValid, error } = UserValidator.validate(fullUserData);

//       if (isValid) {
//         const data = await UserApi.signup(fullUserData);
//         if (data.statusCode === 201 && data.data.accessToken) {
//           setUser(data.data.user);
//           setAccessToken(data.data.accessToken);
//           navigate('/teaMap');
//         } else {
//           alert('Ошибка');
//         }
//       } else {
//         console.log('Ошибка из валидатора', error);
//         alert(error);
//       }
//     } catch (error) {
//       console.log('~~~~~~>>', error);
//       alert(error);
//     }
//   };

//   return (
//     <Card maxW="sm" mx="auto" mt={10} p={4}>
//       <form onSubmit={submitHandler}>
//         <CardHeader>
//           <Heading size="md">Регистрация</Heading>
//           <Text fontSize="sm" color="gray.500">
//             Пожалуйста, заполните форму для регистрации
//           </Text>
//         </CardHeader>

//         <CardBody>
//           <Stack spacing={4}>
//             <FormControl>
//               <FormLabel>Имя пользователя</FormLabel>
//               <Input
//                 type="text"
//                 placeholder="Введите имя"
//                 name="name"
//                 value={inputs.name}
//                 onChange={changeHandler}
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="email"
//                 placeholder="Введите email"
//                 name="email"
//                 value={inputs.email}
//                 onChange={changeHandler}
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Пароль</FormLabel>
//               <Input
//                 type="password"
//                 placeholder="Введите пароль"
//                 name="password"
//                 value={inputs.password}
//                 onChange={changeHandler}
//               />
//             </FormControl>
//           </Stack>
//         </CardBody>

//         <CardFooter justifyContent="flex-end">
//           <Button colorScheme="teal" type="submit">
//             Зарегистрироваться
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// }