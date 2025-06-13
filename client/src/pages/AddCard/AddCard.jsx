import React, { useContext } from "react";
import AddCardForm from "../../features/AddCardForm/AddCardForm";
import { UserContext } from "../../entities/User/UserContext";

export default function AddCard() {
  const { user } = useContext(UserContext);

  const backgroundStyle = {
    backgroundImage:
      'url("https://t3.ftcdn.net/jpg/06/42/14/74/360_F_642147480_dfzbxZlFGVRnMKoTxCFlvaBW2y37u08s.jpg")', // замените на URL вашей картинки
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // или другой размер в зависимости от нужд
    padding: "40px",
  };

  return (
    <div style={backgroundStyle}>
      <AddCardForm />
    </div>
  );
}
