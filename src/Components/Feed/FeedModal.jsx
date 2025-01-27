import React, { useEffect } from 'react';
import styles from './FeedModal.module.css';
import { useFetch } from '../../../Hooks/useFetch';
import { PHOTO_GET } from '../../../api';
import { Error } from '../../../Helper/Error';
import Loading from '../../../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    async function fetchImage() {
      const { url, options } = PHOTO_GET(photo.id);
      await request(url, options);
    }
    fetchImage();
  }, [photo, request]);

  function handleOutsideClick(event) {
    if (event.currentTarget === event.target) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
