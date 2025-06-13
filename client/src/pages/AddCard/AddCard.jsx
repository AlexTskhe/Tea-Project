import React, { useContext } from 'react'
import AddCardForm from '../../features/AddCardForm/AddCardForm'
import { UserContext } from '../../entities/User/UserContext'





export default function AddCard() {
const {user} = useContext(UserContext)

  return (
    <>
    <AddCardForm />
    </>
  )
}
