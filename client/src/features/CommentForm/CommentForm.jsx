import React, { useState } from 'react';
import CommentValidator from '../../entities/Comment/Comment.validator';
import { CommentApi } from '../../entities/Comment/CommentApi';
const defaultValue = {
  commentText: '',
  userId: 3,
  teaId: '',
};

export default function CommentForm({ user, tea, setComments }) {
  const [inputs, setInputs] = useState(defaultValue);

  const inputHandler = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  async function submitHandler(e) {
    e.preventDefault();
    try {
      //   const fullCommentData = { ...inputs, userId: user.id, teaId: tea.id };
      const fullCommentData = { ...inputs, teaId: tea.id };

      const { isValid, error } = CommentValidator.validate(fullCommentData);

      if (isValid) {
        const data = await CommentApi.create(fullCommentData);
        console.log("-----------", data.data);
        const {id, commentText, teaId, userId, user.name } = data.data
        // после реализации авторизации удалить дублирование
        setInputs(defaultValue);
        setComments((prev) => ([...prev, {id, commentText, teaId, userId }]))
        ///
        if (data.statusCode === 200 && data.data.accessToken) {
          setInputs(defaultValue);
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
        <input
          onChange={inputHandler}
          value={inputs.commentText}
          name='commentText'
        />
        <button>Отправить</button>
      </form>
    </>
  );
}
