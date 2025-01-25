import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import PhotoComments from './PhotoComments';
import styles from './PhotoContent.module.css';
import userContext from "../../../UserContext.jsx";
import PhotoDelete from "./PhotoDelete.jsx";

const PhotoContent = ({data}) => {
  const user = useContext(userContext)
  const {photo, comments} = data;
  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title}/>
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user.data && user.data.username === photo.author
              ?
              <PhotoDelete id={photo.id}/>
              :
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            }
            <span className={styles.views}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso}kg</li>
            <li>{photo.idade}anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments
        className={styles.comments}
        id={photo.id}
        comments={comments}
      />
    </div>
  );
};

export default PhotoContent;
