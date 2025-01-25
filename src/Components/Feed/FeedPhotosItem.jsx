import React from 'react';
import styles from './FeedPhotosItem.module.css';
import Image from "../../../Helper/Image.jsx";

const FeedPhotosItem = ({photo, setModalPhoto}) => {
  function handleClick() {
    setModalPhoto(photo);
  }

  return (
    <li className={`${styles.photo} animeLeft`} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title}/>
      <span className={styles.views}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
