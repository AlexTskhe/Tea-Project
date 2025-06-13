import React from 'react';
import CommentItem from '../CommentItem/CommentItem';
import styles from './CommentList.module.css';

export default function CommentList({ tea, comments }) {

  return (
    <>
    <ul className={styles.commentList}>
      {comments.map((comment) => (
        <li key={comment.id} className={styles.commentItem}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
    </>
  );
}
