import React from 'react';

export default function CommentItem({ comment }) {
  return (
    <>
      <article className='comment-item'>
        <header>
          <strong>{comment.name}</strong>
        </header>
        <p>{comment.commentText}</p>
      </article>
    </>
  );
}
