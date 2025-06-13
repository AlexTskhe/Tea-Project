import React, { useContext, useEffect, useState } from 'react';
import CommentForm from '../../features/CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { CommentApi } from '../../entities/Comment/CommentApi';
import { UserContext } from '../../entities/User/UserContext';
import styles from './Comments.module.css';

export default function Comments({ tea }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!tea?.id) return;
    CommentApi.getAllCommentsTea(tea.id)
      .then((result) => {
        const sortedComments = result.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComments(sortedComments);
      })
      .catch((err) => console.log(err));
  }, [tea?.id]);

  return (
    <>
      <section className={styles.commentsWrapper}>
        {user?.name && (
          <CommentForm tea={tea} setComments={setComments} user={user} />
        )}
        <CommentList comments={comments} />
      </section>
    </>
  );
}
