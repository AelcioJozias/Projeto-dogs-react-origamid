import React from 'react';
import styles from './PhotoDelete.module.css'
import {PHOTO_DELETE} from "../../../api.js";
import {useFetch} from "../../../Hooks/useFetch.js";

const PhotoDelete = ({id}) => {

  const {loading, request} = useFetch();

  const handleClick = async () => {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      const {url, options} = PHOTO_DELETE(id);
      const {response} = await request(url, options)
      if (response.ok) window.location.reload()
    }


  }
  return (
    <div>
      {loading
        ?
        <button className={styles.delete} disabled>Deletar</button>
        :
        <button onClick={handleClick} className={styles.delete}>Deletar</button>}
    </div>
  );
};

export default PhotoDelete;