import React from 'react';
import CommentItem from '../CommentItem/CommentItem';

export default function CommentList({ tea, comments }) {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}
