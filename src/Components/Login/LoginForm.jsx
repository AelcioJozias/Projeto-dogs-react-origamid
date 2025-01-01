import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../../api';
import { UserContext } from '../../../UserContext';
export default function LoginForm() {
  const username = useForm();
  const password = useForm();
  const { userLogin } = useContext(UserContext);
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
