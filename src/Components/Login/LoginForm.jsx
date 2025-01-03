import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../../Hooks/useForm';
import { UserContext } from '../../../UserContext';
import { Error } from '../../../Helper/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Form/Button.module.css';
export default function LoginForm() {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem('tokem');
    if (token) {
      getUser(to);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate())
      userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled={loading}>Carregando</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.lost} to="/login/criar">
        Perdeu a senha?
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
        <Link className={stylesBtn.button} to="/login/perdeu">
          Cadastro
        </Link>
      </div>
    </section>
  );
}
