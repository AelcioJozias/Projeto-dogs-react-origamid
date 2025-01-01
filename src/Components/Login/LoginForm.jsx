import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../../api';

export default function LoginForm() {
  const username = useForm();
  const password = useForm();

  useEffect(() => {
    const token = localStorage.getItem('tokem');
    if (token) {
      getUser(to);
    }
  }, []);

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = TOKEN_POST({
      username: username.value,
      password: password.value,
    });
    const response = await fetch(url, options);
    const json = await response.json();
    const { token } = json;
    localStorage.setItem('token', token);
    getUser(token);
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
}
