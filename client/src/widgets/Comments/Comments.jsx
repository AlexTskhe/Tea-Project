import React, { useContext, useEffect, useState } from 'react';
import CommentForm from '../../features/CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { CommentApi } from '../../entities/Comment/CommentApi';
import { UserContext } from '../../entities/User/UserContext';

export default function Comments({ tea }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!tea?.id) return;
    CommentApi.getAllCommentsTea(tea.id)
      .then((result) => setComments((prev) => [...prev, ...result.data]))
      .catch((err) => console.log(err));
  }, [tea?.id]);

  return (
    <>
      {user && <CommentForm tea={tea} setComments={setComments} user={user} />}
      <CommentList tea={tea} comments={comments} />
    </>
  );
}
