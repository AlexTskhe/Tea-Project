import React, { useEffect, useState } from 'react';
import { CommentApi } from '../../entities/Comment/CommentApi';

export default function CommentList({ tea }) {
  const [comments, setComments] = useState([]);
  console.log('🚀 ~ CommentList ~ comments:', tea.id);

  useEffect(() => {
    if (!tea?.id) return;
    CommentApi.getAllCommentsTea(tea.id)
      .then((result) => setComments((prev) => [...prev, ...result.data]))
      .catch((err) => console.log(err));
  }, [tea?.id]);

    console.log("🚀 ~ CommentList ~ comments:", comments)

  return (
 <>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.commentText}</p>
      ))}
    </>
  );
}
