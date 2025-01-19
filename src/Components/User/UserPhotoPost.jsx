import React, { useEffect, useState } from 'react';
import styles from './UserPhotoPost.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../../Hooks/useForm';
import { useFetch } from '../../../Hooks/useFetch';
import { PHOTO_POST } from '../../../api';
import { Error as ErrorMsg } from '../../../Helper/Error';
import { useNavigate } from 'react-router-dom';
const UserPhotoPost = () => {
  const name = useForm();
  const weight = useForm('number');
  const age = useForm('number');
  const [img, setImg] = useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate('/conta');
  }, data);

  function handleSubmit(event) {
    event.preventDefault();
    const isNameValid = name.validate();
    const isWeightValid = weight.validate();
    const isAgeValid = age.validate();

    if (!isNameValid && !isWeightValid && !isAgeValid)
      throw new Error('Incomplete data');

    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', name.value);
    formData.append('peso', weight.value);
    formData.append('idade', age.value);

    const { url, options } = PHOTO_POST(
      formData,
      window.localStorage.getItem('token'),
    );

    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0]),
    });
  }

  return (
    <section className={`${styles.photoPost} anime-left`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...name} />
        <Input label="Peso" type="text" name="peso" {...weight} />
        <Input label="Idade" type="text" name="idade" {...age} />
        <input
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
          required
        />
        {loading ? (
          <Button disabled={loading}>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        {error && <ErrorMsg error={error} />}
      </form>
      {img.preview && (
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img.preview})` }}
        >
          {' '}
        </div>
      )}
    </section>
  );
};

export default UserPhotoPost;
