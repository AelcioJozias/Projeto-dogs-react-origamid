import React, { useState } from 'react';
import SendIcon from '../../Assets/enviar.svg?react';
import { useFetch } from '../../../Hooks/useFetch';
import { COMMENT_POST } from '../../../api';
import { Error } from '../../../Helper/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const { request, error, loading } = useFetch();
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    setComment('');
    if (response.ok) setComments((comments) => [...comments, json]);
  };
  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''} `}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => {
          setComment(target.value);
        }}
      />
      {loading ? (
        <button disabled className={styles.button}>
          <SendIcon />
        </button>
      ) : (
        <button className={styles.button}>
          <SendIcon />
        </button>
      )}

      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
