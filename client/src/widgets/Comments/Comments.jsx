import React, { useEffect, useState } from 'react';
import CommentForm from '../../features/CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { CommentApi } from '../../entities/Comment/CommentApi';

export default function Comments({ tea, user }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!tea?.id) return;
    CommentApi.getAllCommentsTea(tea.id)
      .then((result) => setComments((prev) => [...prev, ...result.data]))
      .catch((err) => console.log(err));
  }, [tea?.id]);

  return (
    <>
      <CommentForm tea={tea} setComments={setComments} user={user}/>
      <CommentList tea={tea} comments={comments} />
    </>
  );
}
