import React, { useEffect } from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import { Error } from '../../../Helper/Error';
import Loading from '../../../Helper/Loading';
import { useFetch } from '../../../Hooks/useFetch';
import { PHOTOS_GET } from '../../../api';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({
  setModalPhoto,
  user,
  page,
  setIsToContinueFetchImages,
}) => {
  const { data, loading, error, request } = useFetch();
  useEffect(() => {
    async function fetchPhotos() {
      let total = 3;
      const { url, options } = PHOTOS_GET({ page, total, user: user ?? 0 });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < total) {
        setIsToContinueFetchImages(false);
      }
    }

    fetchPhotos();
  }, [request, setIsToContinueFetchImages]);
  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={styles.feed}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
};

export default FeedPhotos;
