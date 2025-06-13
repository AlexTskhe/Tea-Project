import React, { useState } from 'react';
import CommentValidator from '../../entities/Comment/Comment.validator';
import { CommentApi } from '../../entities/Comment/CommentApi';
import styles from './CommentForm.module.css';

const defaultValue = {
  commentText: '',
  userId: '',
  teaId: '',
};

export default function CommentForm({ user, tea, setComments }) {
  // console.log('first', user.id)
  const [inputs, setInputs] = useState(defaultValue);

  const inputHandler = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  async function submitHandler(e) {
    e.preventDefault();
    try {
      //   const fullCommentData = { ...inputs, userId: user.id, teaId: tea.id };
      const fullCommentData = { ...inputs, teaId: tea?.id, userId: user?.id };

      const { isValid, error } = CommentValidator.validate(fullCommentData);
      if (isValid) {
        const data = await CommentApi.create(fullCommentData);
        const { id, commentText, teaId, userId, name } = data.data;
        // console.log(id, commentText, teaId, userId, name)
        // после реализации авторизации удалить дублирование
        setInputs(defaultValue);
        setComments((prev) => [
          { id, commentText, teaId, userId, name },
          ...prev,
        ]);
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
      <form onSubmit={submitHandler} className={styles.commentForm}>
        <input
          className={styles.commentInput}
          onChange={inputHandler}
          value={inputs.commentText}
          name='commentText'
          placeholder='Оставьте комментарий...'
          required
        />
        <button type='submit' className={styles.submitBtn}>
          Отправить
        </button>
      </form>
    </>
  );
}
